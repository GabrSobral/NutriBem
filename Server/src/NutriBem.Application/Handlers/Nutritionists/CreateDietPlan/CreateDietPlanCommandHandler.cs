
namespace NutriBem.Application.Handlers.Nutritionists.CreateDietPlan;

public class CreateDietPlanCommandHandler(
    ILogger<CreateDietPlanCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<CreateDietPlanCommand, CreateDietPlanResponse>
{
    public async Task<CreateDietPlanResponse> Handle(CreateDietPlanCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Creating diet plan...");

        var nutritionistProfile = await dbContext.NutritionistProfiles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == command.AccountRequesterId, cancellationToken)
        ?? throw new NutritionistNotFound(command.AccountRequesterId);

        var patient = await dbContext.LinkAssociations
            .Include(x => x.User)
                .ThenInclude(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.UserId == command.PatientId, cancellationToken)
        ?? throw new PatientNotFoundException(command.PatientId);

        var dietPlan = new DietPlan
        {
            Id = Ulid.NewUlid(),
            Name = command.Name,
            Description = command.Description,
            AdditionalNote = command.AdditionalNote,
            StartDate = command.StartDate,
            EndDate = command.EndDate,
            PatientId = patient.UserId,
            CreatedBy = command.AccountRequesterId,
        };

        var meals = new List<Meal>();

        foreach (var meal in command.Meals)
        {
            var mealEntity = new Meal
            {
                Id = Ulid.NewUlid(),
                Name = meal.Name,
                DietPlanId = dietPlan.Id,
                UserId = patient.UserId,
                CarbohydratesCountMax = meal.Foods.Sum(x => x.ServingCarbohydrates),
                FatCountMax = meal.Foods.Sum(x => x.ServingFats),
                ProteinCountMax = meal.Foods.Sum(x => x.ServingProteins),
                RegisteredAt = DateTime.UtcNow,
                Order = 0,
            };

            var mealFoods = new List<MealFood>();

            foreach (var mealFood in meal.Foods)
            {
                mealFoods.Add(new MealFood
                {
                    Id = Ulid.NewUlid(),
                    MealId = mealEntity.Id,

                    FoodId = mealFood.FoodId,
                    FoodName = mealFood.FoodName,

                    ServingId = mealFood.ServingId,
                    ServingName = mealFood.ServingName,
                    ServingFats = mealFood.ServingFats,
                    ServingCalories = mealFood.ServingCalories,
                    ServingProteins = mealFood.ServingProteins,
                    ServingCarbohydrates = mealFood.ServingCarbohydrates,

                    Quantity = mealFood.Quantity,
                    RegisteredAt = DateTime.UtcNow
                });
            }

            mealEntity.MealFoods = mealFoods;
            meals.Add(mealEntity);
        }

        dietPlan.Meals = meals;

        await dbContext.DietPlans.AddAsync(dietPlan, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new CreateDietPlanResponse(dietPlan.Id);
    }
}

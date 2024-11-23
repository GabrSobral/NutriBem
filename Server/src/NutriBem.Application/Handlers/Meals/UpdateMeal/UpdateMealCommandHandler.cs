
namespace NutriBem.Application.Handlers.Meals.UpdateMeal;

public class UpdateMealCommandHandler(
    ILogger<UpdateMealCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<UpdateMealCommand>
{
    public async Task Handle(UpdateMealCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Updating meal {MealId}...", command.MealId);

        var meal = await dbContext.Meals
            .FirstOrDefaultAsync(m => m.Id == command.MealId, cancellationToken)
       ?? throw new MealNotFoundException(command.MealId);

        meal.Name = command.Name ?? meal.Name;
        meal.Order = command.Order ?? meal.Order;
        meal.FatCountMax = command.FatCountMax ?? meal.FatCountMax;
        meal.ProteinCountMax = command.ProteinCountMax ?? meal.ProteinCountMax;
        meal.CarbohydratesCountMax = command.CarbohydratesCountMax ?? meal.CarbohydratesCountMax;
        meal.MealFoods = command.MealFoods?.Select(mf => new MealFood
        {
            Id = mf.Id,
            MealId = mf.MealId,
            FoodId = mf.FoodId,
            Quantity = mf.Quantity,
            FoodName = mf.FoodName,
            ServingId = mf.ServingId,
            ServingName = mf.ServingName,
            RegisteredAt = mf.RegisteredAt,
            ServingCalories = mf.ServingCalories,
            ServingCarbohydrates = mf.ServingCarbohydrates,
            ServingProteins = mf.ServingProteins,
            ServingFats = mf.ServingFats
        }).ToList() ?? meal.MealFoods;

        var mealsFromDate = await dbContext.Meals
            .Where(x => x.RegisteredAt.Date == meal.RegisteredAt.Date)
            .ToListAsync(cancellationToken);

        // reorder meals based on the new order
        // ex: banana: 1, apple: 2, orange: 3
        // change banana to 3, so the result must be:
        // apple: 1, orange: 2, banana: 3

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

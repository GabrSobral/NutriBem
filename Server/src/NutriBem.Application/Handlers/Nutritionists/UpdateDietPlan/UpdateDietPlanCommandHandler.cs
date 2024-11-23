namespace NutriBem.Application.Handlers.Nutritionists.UpdateDietPlan;

public class UpdateDietPlanCommandHandler(
    ILogger<UpdateDietPlanCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<UpdateDietPlanCommand, UpdateDietPlanResponse>
{
    public async Task<UpdateDietPlanResponse> Handle(UpdateDietPlanCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Updating diet plan...");

        var nutritionistProfile = await dbContext.NutritionistProfiles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == command.AccountRequesterId, cancellationToken)
        ?? throw new NutritionistNotFound(command.AccountRequesterId);

        var patient = await dbContext.LinkAssociations
            .Include(x => x.User)
            .ThenInclude(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.UserId == command.PatientId, cancellationToken)
        ?? throw new PatientNotFoundException(command.PatientId);

        var dietPlanDb = await dbContext.DietPlans
            .Include(x => x.Meals)
                .ThenInclude(x => x.MealFoods)
            .FirstOrDefaultAsync(x => x.Id == command.DietPlanId, cancellationToken)
        ?? throw new DietPlanNotFoundException(command.DietPlanId);

        dietPlanDb.Name = command.Name;
        dietPlanDb.Description = command.Description;
        dietPlanDb.AdditionalNote = command.AdditionalNote;
        dietPlanDb.StartDate = command.StartDate;
        dietPlanDb.EndDate = command.EndDate;
        dietPlanDb.PatientId = patient.UserId;
        dietPlanDb.CreatedBy = command.AccountRequesterId;

        // get meals that contain in command but in dietPlanDb dont
        var mealsToDelete = dietPlanDb.Meals.Where(x => !command.Meals.Select(x => x.Id).Contains(x.Id)).ToList();

        // delete meals that are not in command
        foreach (var meal in mealsToDelete)
        {
            var mealFoodsToDelete = meal.MealFoods.ToList();
            foreach (var mealFood in mealFoodsToDelete)
            {
                dbContext.MealFoods.Remove(mealFood);
            }

            dbContext.Meals.Remove(meal);
        }

        // Update meals
        foreach (var meal in command.Meals ?? [])
        {
            var existingMeal = dietPlanDb.Meals.FirstOrDefault(m => m.Id == meal.Id);
            if (existingMeal != null)
            {
                existingMeal.Name = meal.Name;
                existingMeal.CarbohydratesCountMax = meal.Foods.Sum(x => x.ServingCarbohydrates);
                existingMeal.FatCountMax = meal.Foods.Sum(x => x.ServingFats);
                existingMeal.ProteinCountMax = meal.Foods.Sum(x => x.ServingProteins);
                existingMeal.RegisteredAt = DateTime.UtcNow;

                // Create a new list of MealFoods
                var newMealFoods = new List<MealFood>();

                foreach (var mealFood in meal.Foods)
                {
                    newMealFoods.Add(new MealFood
                    {
                        Id = mealFood.Id,
                        MealId = existingMeal.Id,
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

                // Replace the existing MealFoods with the new list
                existingMeal.MealFoods = newMealFoods;
            }
            else
            {
                // Handle the case where the meal does not exist in the database
                var newMeal = new Meal
                {
                    Id = meal.Id,
                    Name = meal.Name,
                    DietPlanId = command.DietPlanId,
                    CarbohydratesCountMax = meal.Foods.Sum(x => x.ServingCarbohydrates),
                    FatCountMax = meal.Foods.Sum(x => x.ServingFats),
                    ProteinCountMax = meal.Foods.Sum(x => x.ServingProteins),
                    RegisteredAt = DateTime.UtcNow,
                    UserId = dietPlanDb.PatientId,
                };

                // Create a new list of MealFoods
                var newMealFoods = new List<MealFood>();

                foreach (var mealFood in meal.Foods)
                {
                    newMealFoods.Add(new MealFood
                    {
                        Id = mealFood.Id,
                        MealId = newMeal.Id,
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

                // Replace the existing MealFoods with the new list
                newMeal.MealFoods = newMealFoods;

                await dbContext.Meals.AddAsync(newMeal, cancellationToken);
            }
        }

        dbContext.DietPlans.Update(dietPlanDb);

        await dbContext.SaveChangesAsync(cancellationToken);

        return new UpdateDietPlanResponse(dietPlanDb.Id);
    }
}

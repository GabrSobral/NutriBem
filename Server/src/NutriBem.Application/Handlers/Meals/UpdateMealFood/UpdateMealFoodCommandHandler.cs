namespace NutriBem.Application.Handlers.Meals.UpdateMealFood;

public sealed class UpdateMealFoodCommandHandler(
    ILogger<UpdateMealFoodCommandHandler> logger,
    DataContext dbContext
    ) : ICommandHandler<UpdateMealFoodCommand, UpdateMealFoodResponse>
{
    public async Task<UpdateMealFoodResponse> Handle(UpdateMealFoodCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Updating meal food {Name}", command.FoodName);

        var mealFood = await dbContext.MealFoods
            .FirstOrDefaultAsync(x => x.Id == command.MealFoodId, cancellationToken)
         ?? throw new MealFoodNotFoundException(command.MealFoodId);

        mealFood.FoodId = command.FoodId ?? mealFood.FoodId;
        mealFood.FoodName = command.FoodName ?? mealFood.FoodName;
        mealFood.ServingId = command.ServingId ?? mealFood.ServingId;
        mealFood.ServingName = command.ServingName ?? mealFood.ServingName;
        mealFood.Quantity = command.Quantity ?? mealFood.Quantity;
        mealFood.ServingCalories = command.ServingCalories ?? mealFood.ServingCalories;
        mealFood.ServingCarbohydrates = command.ServingCarbohydrates ?? mealFood.ServingCarbohydrates;
        mealFood.ServingFats = command.ServingFats ?? mealFood.ServingFats;
        mealFood.ServingProteins = command.ServingProteins ?? mealFood.ServingProteins;

        dbContext.MealFoods.Update(mealFood);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new UpdateMealFoodResponse(mealFood.Id);
    }
}

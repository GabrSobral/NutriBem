using NutriBem.Application.Handlers.Meals.AddMealFood;

namespace NutriBem.Application.Handlers.Meals.AddMealFood;

public sealed class UpdateMealFoodCommandHandler(
    ILogger<UpdateMealFoodCommandHandler> logger,
    DataContext dbContext
    ) : ICommandHandler<AddMealFoodCommand, AddMealFoodResponse>
{
    public async Task<AddMealFoodResponse> Handle(AddMealFoodCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Adding meal {Name}", command.FoodName);

        var dailyMeals = await dbContext.Meals
            .FirstOrDefaultAsync(x => x.Id == command.MealId, cancellationToken);

        var mealFood = new MealFood
        {
            Id = Ulid.NewUlid(),
            MealId = command.MealId,
            FoodId = command.FoodId,
            FoodName = command.FoodName,
            ServingId = command.ServingId,
            ServingName = command.ServingName,
            Quantity = command.Quantity,
            EatenAt = DateTime.UtcNow,
            RegisteredAt = DateTime.UtcNow,
            ServingCalories = command.ServingCalories,
            ServingCarbohydrates = command.ServingCarbohydrates,
            ServingFats = command.ServingFats,
            ServingProteins = command.ServingProteins,
        };

        await dbContext.MealFoods.AddAsync(mealFood, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new AddMealFoodResponse(mealFood.Id);
    }
}

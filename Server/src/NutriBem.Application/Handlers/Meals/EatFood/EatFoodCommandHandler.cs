namespace NutriBem.Application.Handlers.Meals.EatFood;

public class EatFoodCommandHandler(
    ILogger<EatFoodCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<EatFoodCommand>
{
    public async Task Handle(EatFoodCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Eating food {FoodId} from meal {MealId}", command.MealFoodId, command.MealId);

        var mealFood = await dbContext.MealFoods
            .FirstOrDefaultAsync(x => x.Id == command.MealFoodId, cancellationToken)     
        ?? throw new MealFoodNotFoundException(command.MealFoodId);

        mealFood.EatenAt = DateTime.UtcNow;

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

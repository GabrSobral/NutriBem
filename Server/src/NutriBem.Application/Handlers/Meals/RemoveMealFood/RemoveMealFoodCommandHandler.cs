
namespace NutriBem.Application.Handlers.Meals.RemoveMealFood;

public class RemoveMealFoodCommandHandler(
    ILogger<RemoveMealFoodCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<RemoveMealFoodCommand>
{
    public async Task Handle(RemoveMealFoodCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Removing meal food {MealFoodId}", command.MealFoodId);

        await dbContext.MealFoods
            .Where(x => x.Id == command.MealFoodId)
            .ExecuteDeleteAsync(cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

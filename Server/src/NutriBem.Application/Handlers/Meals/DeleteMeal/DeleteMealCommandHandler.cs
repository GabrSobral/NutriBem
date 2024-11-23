namespace NutriBem.Application.Handlers.Meals.DeleteMeal;

public class DeleteMealCommandHandler(
    ILogger<DeleteMealCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<DeleteMealCommand>
{
    public async Task Handle(DeleteMealCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Deleting meal {MealId}", command.MealId);
        
        var mealToDelete = await dbContext.Meals
            .FirstOrDefaultAsync(x => x.Id == command.MealId, cancellationToken)
        ?? throw new MealNotFoundException(command.MealId);

        var mealsFromDate = await dbContext.Meals
            .Where(x => x.RegisteredAt.Date == mealToDelete.RegisteredAt.Date)
            .ToListAsync(cancellationToken);

        // reorder meals
        foreach (var meal in mealsFromDate.Where(x => x.Order > mealToDelete.Order))
        {
            meal.Order--;
        }

        dbContext.Meals.Remove(mealToDelete);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

namespace NutriBem.Application.Handlers.Meals.AddMeal;

public sealed class AddMealCommandHandler(
    ILogger<AddMealCommandHandler> logger,
    DataContext dbContext
    ) : ICommandHandler<AddMealCommand, AddMealCommandResponse>
{
    public async Task<AddMealCommandResponse> Handle(AddMealCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Adding meal {Name}", command.Name);

        var dailyMeals = await dbContext.Meals
            .AsNoTracking()
            .Where(x => x.RegisteredAt.Date == command.RegisteredAt.Date)
            .ToListAsync(cancellationToken) ?? [];

        var nextOrder = dailyMeals.Count > 0 ? (ushort)dailyMeals?.Max(x => x.Order) : (ushort)0;

        var meal = Meal.Create(command.Name, (ushort)((nextOrder) + 1), command.AccountRequesterId, command.RegisteredAt);

        await dbContext.Meals.AddAsync(meal, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new AddMealCommandResponse(meal.Id);
    }
}

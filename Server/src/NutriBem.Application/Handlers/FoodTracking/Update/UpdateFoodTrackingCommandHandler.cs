namespace NutriBem.Application.Handlers.FoodTracking;
public sealed class UpdateFoodTrackingCommandHandler(
    ILogger<UpdateFoodTrackingCommandHandler> logger,
    DataContext dbContext
) : ICommand<UpdateFoodTrackingCommand>
{
    public async Task Handle(UpdateFoodTrackingCommand command, CancellationToken cancellationToken)
    {
        var foodTracking = await dbContext.DailyFoodTrackings
            .FirstOrDefaultAsync(x => x.UserId == command.UserId && x.FoodId == command.FoodId, cancellationToken)
        ?? throw new FoodTrackingNotFoundException();

        foodTracking.FoodName = command.FoodName;
        foodTracking.FatCount = command.FatCount;
        foodTracking.ProteinCount = command.ProteinCount;
        foodTracking.CarbohydratesCount = command.CarbohydratesCount;
        foodTracking.RegisteredAt = command.RegisteredAt;

        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation($"The food tracking was updated: {foodTracking.FoodName}");
    }
}


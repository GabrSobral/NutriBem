namespace NutriBem.Application.Handlers.FoodPortion.UpdateFoodPortion;

public class UpdateFoodPortionCommandHandler(
    ILogger<UpdateFoodPortionCommandHandler> logger,
    DataContext dbContext
) : ICommand<UpdateFoodPortionCommand>
{
    public async Task Handle(UpdateFoodPortionCommand command, CancellationToken cancellationToken)
    {
        var foodPortion = await dbContext.FoodPortion
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken)
        ?? throw new FoodPortionNotFoundException(command.Id);

        foodPortion.FoodId = command.FoodId;
        foodPortion.Modifier = command.Modifier;
        foodPortion.GramWeight = command.GramWeight;
        foodPortion.SequenceNumber = command.SequenceNumber;
        foodPortion.PortionDescription = command.PortionDescription;
        foodPortion.MeasureUnitId = command.MeasureUnitId;
        foodPortion.MinYearAcquired = command.MinYearAcquired;
        foodPortion.Amount = command.Amount;
        foodPortion.Value = command.Value;

        await dbContext.SaveChangesAsync(cancellationToken);
    
        logger.LogInformation($"The food portion was updated: {foodPortion.PortionDescription}");
    }
}
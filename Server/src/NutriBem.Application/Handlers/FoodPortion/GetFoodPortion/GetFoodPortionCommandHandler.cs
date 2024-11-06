namespace NutriBem.Application.Handlers.FoodPortion.GetFoodPortion;
public class GetFoodPortionCommandHandler(
    DataContext dbContext
) : ICommandHandler<GetFoodPortionCommand, GetFoodPortionResponse>
{
    public async Task<GetFoodPortionResponse> Handle(GetFoodPortionCommand command, CancellationToken cancellationToken)
    {
        var foodPortion = await dbContext.FoodPortion
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken)
        ?? throw new FoodPortionNotFoundException(command.Id);

        return new GetFoodPortionResponse
        {
            Id = foodPortion.Id,
            FoodId = foodPortion.FoodId,
            Modifier = foodPortion.Modifier,
            GramWeight = foodPortion.GramWeight,
            SequenceNumber = foodPortion.SequenceNumber,
            PortionDescription = foodPortion.PortionDescription,
            MeasureUnitId = foodPortion.MeasureUnitId,
            MinYearAcquired = foodPortion.MinYearAcquired,
            Amount = foodPortion.Amount,
            Value = foodPortion.Value
        };
    }
}

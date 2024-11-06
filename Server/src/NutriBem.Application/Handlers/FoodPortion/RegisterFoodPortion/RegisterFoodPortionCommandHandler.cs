namespace NutriBem.Application.Handlers.FoodPortion.RegisterFoodPortion;
public class RegisterFoodPortionCommandHandler(
    DataContext dbContext
) : ICommandHandler<RegisterFoodPortionCommand, RegisterFoodPortionResponse>
{
    public async Task<RegisterFoodPortionResponse> Handle(RegisterFoodPortionCommand command, CancellationToken cancellationToken)
    {
        var food = await dbContext.FoodPortion.FirstOrDefaultAsync(x => x.Id == command.FoodId) ?? throw new FoodNotFoundException(command.FoodId);

        var foodPortion = new Domain.Entities.FoodPortion
        {
            Id = command.Id,
            FoodId = command.FoodId,
            Modifier = command.Modifier,
            GramWeight = command.GramWeight,
            SequenceNumber = command.SequenceNumber,
            PortionDescription = command.PortionDescription,
            MeasureUnitId = command.MeasureUnitId,
            MinYearAcquired = command.MinYearAcquired,
            Amount = command.Amount,
            Value = command.Value
        };

        await dbContext.FoodPortion.AddAsync(foodPortion, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new RegisterFoodPortionResponse
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

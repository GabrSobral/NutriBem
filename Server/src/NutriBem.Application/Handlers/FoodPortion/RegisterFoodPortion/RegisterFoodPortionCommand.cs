namespace NutriBem.Application.Handlers.FoodPortion;
public record RegisterFoodPortionCommand(
    int Id,
    int FoodId,
    string Modifier,
    double GramWeight,
    int SequenceNumber,
    string PortionDescription,
    int MeasureUnitId,
    int MinYearAcquired,
    double Amount,
    double Value
) : ICommand<RegisterFoodPortionResponse>;

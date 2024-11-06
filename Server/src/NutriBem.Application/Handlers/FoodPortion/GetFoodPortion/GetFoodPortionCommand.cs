namespace NutriBem.Application.Handlers.FoodPortion.GetFoodPortion;
public record GetFoodPortionCommand(
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
) : ICommand<GetFoodPortionResponse>;

namespace NutriBem.Application.Handlers.FoodPortion.UpdateFoodPortion;

public record UpdateFoodPortionCommand(
    int Id,
    int FoodId,
    string? Modifier,
    double GramWeight,
    int SequenceNumber,
    string? PortionDescription,
    int MeasureUnitId,
    int MinYearAcquired,
    double Amount,
    double Value
) : ICommand<UpdateFoodPortionResponse>;
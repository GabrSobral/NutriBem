namespace NutriBem.Application.Handlers.FoodPortion.UpdateFoodPortion;

public record UpdateFoodPortionQuery() : IQuery<UpdateFoodPortionResponse>;

public record UpdateFoodPortionResponse
{
    public int Id { get; init; }
    public int FoodId { get; init; }
    public string? Modifier { get; set; }
    public double GramWeight { get; set; }
    public int SequenceNumber { get; set; }
    public string? PortionDescription { get; set; }
    public int MeasureUnitId { get; set; }
    public int MinYearAcquired { get; set; }
    public double Amount { get; set; }
    public double Value { get; set; }
}
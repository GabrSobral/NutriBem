namespace NutriBem.Application.Handlers.FoodTracking;
public record GetFoodPortionQuery(int Id) : IQuery<IEnumerable<GetFoodPortionResponse>>;

public record GetFoodPortionResponse
{
    public int Id { get; set; }
    public int FoodId { get; set; }
    public string Modifier { get; set; }
    public double GramWeight { get; set; }
    public int SequenceNumber { get; set; }
    public string PortionDescription { get; set; }
    public int MeasureUnitId { get; set; }
    public int MinYearAcquired { get; set; }
    public double Amount { get; set; }
    public double Value { get; set; }
}

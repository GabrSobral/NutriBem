namespace NutriBem.Application.Handlers.FoodTracking;
public record UpdateFoodTrackingQuery() : IQuery<IEnumerable<UpdateFoodTrackingResponse>>;

public record UpdateFoodTrackingResponse
{
    public Ulid UserId { get; init; }
    public int FoodId { get; init; }
    public string? FoodName { get; set; }
    public decimal FatCount { get; set; }
    public decimal ProteinCount { get; set; }
    public decimal CarbohydratesCount { get; set; }
    public DateTime RegisteredAt { get; set; }
}

namespace NutriBem.Application.Handlers.Food.GetFood;

public record GetFoodQuery(int Id) : IQuery<GetFoodResponse>;

public record GetFoodResponse
{
    public int Id { get; set; }
    public int FoodCategoryId { get; set; }
    public int FdcId { get; set; }
    public string? FoodClass { get; set; }
    public string? Description { get; set; }
    public string? FoodCode { get; set; }
    public DateTime PublicationDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? UnitName { get; set; }
    public string? DataType { get; set; }
}
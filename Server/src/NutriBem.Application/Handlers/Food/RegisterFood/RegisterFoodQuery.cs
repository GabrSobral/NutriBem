namespace NutriBem.Application.Handlers.Food.RegisterFood;

public record registerFoodQuery() : IQuery<IEnumerable<RegisterFoodResponse>>;

public record RegisterFoodResponse
{
    public int Id { get; set; }
    public int FoodCategoryId { get; set; }
    public int FdcId { get; set; }
    public string FoodClass { get; set; }
    public string Description { get; set; }
    public string FoodCode { get; set; }
    public DateTime PublicationDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string UnitName { get; set; }
    public string DataType { get; set; }
}
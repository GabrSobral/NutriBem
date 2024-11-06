namespace NutriBem.Domain.Entities;

[Table("food")]
public class Food
{
    [Key]
    public int Id { get; set; }
    
    [Column("food_category_id")]
    public int FoodCategoryId { get; set; }
    
    [Column("fdc_id")]
    public int FdcId { get; set; }
    
    [Column("description")]
    public string? FoodClass { get; set; }
    public string? Description { get; set; }
    
    [Column("food_code")]
    public string? FoodCode { get; set; }
    
    [Column("publication_date")]
    public DateTime PublicationDate { get; set; }
    
    [Column("start_date")]
    public DateTime StartDate { get; set; }
    
    [Column("end_date")]
    public DateTime EndDate { get; set; }
    
    [Column("unit_name")]
    public string? UnitName { get; set; }
    
    [Column("data_type")]
    public string? DataType { get; set; }
}


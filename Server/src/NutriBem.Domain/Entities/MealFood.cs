namespace NutriBem.Domain.Entities;

[Table("meal_food")]
public class MealFood
{
    [Key]
    public required Ulid Id { get; set; }

    public required Ulid MealId { get; set; }

    [Required]
    public required string FoodId { get; set; }

    [Required]
    public required string FoodName { get; set; }

    [Required]
    public required string ServingId { get; set; }
    [Required]
    public required string ServingName { get; set; }

    [Required]
    public required int Quantity { get; set; }

    [Required]
    public required DateTime RegisteredAt { get; set; }

    public DateTime? EatenAt { get; set; }

    public int? ServingCalories { get; set; }
    public double? ServingCarbohydrates { get; set; }
    public double? ServingProteins { get; set; }
    public double? ServingFats { get; set; }

    #region Foreign Keys

    [ForeignKey(nameof(MealId))]
    public Meal Meal { get; set; }

    #endregion
}

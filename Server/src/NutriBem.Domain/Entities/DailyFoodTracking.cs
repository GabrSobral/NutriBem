namespace NutriBem.Domain.Entities;

[Table("daily_food_tracking")]
public class DailyFoodTracking
{
    [Key]
    public Ulid Id { get; set; }

    [Required]
    [ForeignKey("UserId")]
    public Ulid UserId { get; set; }

    [Required]
    public int FoodId { get; set; }

    [Required]
    [MaxLength(255)]
    public string FoodName { get; set; }

    [Required]
    public decimal FatCount { get; set; }

    [Required]
    public decimal ProteinCount { get; set; }

    [Required]
    public decimal CarbohydratesCount { get; set; }

    [Required]
    public DateTime RegisteredAt { get; set; }

    public static DailyFoodTracking Create(Ulid userId, int foodId, string foodName, decimal fatCount, decimal proteinCount, decimal carbohydratesCount, DateTime registeredAt)
    {
        return new DailyFoodTracking()
        {
            Id = Ulid.NewUlid(),
            UserId = userId,
            FoodId = foodId,
            FoodName = foodName,
            FatCount = fatCount,
            ProteinCount = proteinCount,
            CarbohydratesCount = carbohydratesCount,
            RegisteredAt = registeredAt
        };
    }
}
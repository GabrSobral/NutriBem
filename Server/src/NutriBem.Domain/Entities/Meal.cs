namespace NutriBem.Domain.Entities;

[Table("meal")]
public class Meal
{
    [Key]
    public Ulid Id { get; set; }

    public Ulid UserId { get; set; }
    public Ulid? DietPlanId { get; set; }

    public string Name { get; set; } = string.Empty;
    public double? FatCountMax { get; set; }
    public double? ProteinCountMax { get; set; }
    public double? CarbohydratesCountMax { get; set; }

    public ushort Order { get; set; }

    public DateTime RegisteredAt { get; set; }

    #region Foreign Keys

    [ForeignKey(nameof(UserId))]
    public User User { get; set; }

    [ForeignKey(nameof(DietPlanId))]
    public DietPlan DietPlan { get; set; }

    public IEnumerable<MealFood> MealFoods { get; set; }

    #endregion

    public static Meal Create(string name, ushort order, Ulid userId, DateTime registeredAt)
    {
        return new Meal()
        {
            Id = Ulid.NewUlid(),
            Name = name,
            RegisteredAt = registeredAt,
            Order = order,
            UserId = userId,
        };
    }
}

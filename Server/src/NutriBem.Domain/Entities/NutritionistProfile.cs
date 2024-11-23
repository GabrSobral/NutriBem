namespace NutriBem.Domain.Entities;

[Table("nutritionist_profile")]
public class NutritionistProfile
{
    [Key]
    [Required]
    public required Ulid UserId { get; set; }

    [Required]
    public required string Crn { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;

    #region Foreign Keys

    [ForeignKey(nameof(UserId))]
    public User User { get; set; }

    public IEnumerable<LinkAssociation> LinkAssociations { get; set; }
    public IEnumerable<DietPlan> DietPlans { get; set; }

    #endregion


    public static NutritionistProfile Create(string crn, Ulid userId)
    {
        return new NutritionistProfile
        {
            UserId = userId,
            Crn = crn,
            CreatedAt = DateTime.UtcNow,
            IsActive = true,
        };
    }
}

namespace NutriBem.Domain.Entities;

[Table("link_association")]
public class LinkAssociation
{
    [Key]
    public required Ulid Id { get; set; }

    [Required]
    public required Ulid NutritionistId { get; set; }

    [Required]
    public Ulid UserId { get; set; }

    public bool IsAccepted { get; set; } = true;
    public DateTime ExpiryAt { get; set; }
    public DateTime CreatedAt { get; set; }


    [ForeignKey(nameof(UserId))]
    public User User { get; set; }

    [ForeignKey(nameof(NutritionistId))]
    public NutritionistProfile NutritionistProfile { get; set; }

    public static LinkAssociation Create(Ulid userId, Ulid nutritionistId)
    {
        return new LinkAssociation
        {
            Id = Ulid.NewUlid(),
            UserId = userId,
            NutritionistId = nutritionistId,
            IsAccepted = true,
            ExpiryAt = DateTime.UtcNow.AddMonths(3),
            CreatedAt = DateTime.UtcNow
        };
    }
}
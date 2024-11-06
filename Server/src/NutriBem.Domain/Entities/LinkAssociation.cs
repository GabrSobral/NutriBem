namespace NutriBem.Domain.Entities;

[Table("link_association")]
public class LinkAssociation
{
    [Key]
    public Ulid Id { get; set; }
    public bool IsAccepted { get; set; }
    public DateTime ExpiryAt { get; set; }
    public DateTime CreatedAt { get; set; }
    
    [ForeignKey("user_id")]
    public Ulid UserId { get; set; }

    [ForeignKey("nutritionist_id")]
    public Ulid NutritionistId { get; set; }

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
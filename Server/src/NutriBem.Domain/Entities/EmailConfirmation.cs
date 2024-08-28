namespace NutriBem.Domain.Entities;

[Table("email_confirmation")]
public class EmailConfirmation
{
    [Key]
    public Ulid Id { get; set; }

    [Required]
    public required Ulid UserId { get; set; }

    [Required]
    [MaxLength(255)]
    public required Guid Token { get; set; }

    public required DateTime CreatedAt { get; set; }
    public required DateTime ExpiresAt { get; set; }

    public required bool IsUsed { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; }

    public static EmailConfirmation Create(Ulid userId)
    {
        var currentDate = DateTime.UtcNow;

        return new EmailConfirmation()
        {
            Id = Ulid.NewUlid(),
            CreatedAt = currentDate,
            ExpiresAt = currentDate.AddMinutes(30),
            Token = Guid.NewGuid(),
            IsUsed = false,
            UserId = userId
        };
    }
}

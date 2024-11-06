namespace NutriBem.Domain.Entities;

[Table("nutritionist")]
public class Nutritionist
{
    [Key]
    public required Ulid Id { get; set; }

    [Required]
    public required string Document { get; set; }

    [Required]
    public required string Email { get; set; }

    [MaxLength(255)]
    public string? PasswordHash { get; set; }

     public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsEmailConfirmed { get; set; } = false;
    public bool TwoFactorEnabled { get; set; } = false;
    public string TwoFactorSecret { get; set; } = string.Empty;


    public UserProfile UserProfile { get; set; }
    public IEnumerable<PasswordResetToken> PasswordResetTokens { get; set; }
    public IEnumerable<ExternalLogin> ExternalLogins { get; set; }
    public IEnumerable<RefreshToken> RefreshTokens { get; set; }
    public IEnumerable<EmailConfirmation> EmailConfirmations { get; set; }

    public static Nutritionist Create(string document, string email, string passwordHash)
    {
        return new Nutritionist
        {
            Id = Ulid.NewUlid(),
            Document = document,
            Email = email,
            PasswordHash = passwordHash,
            CreatedAt = DateTime.UtcNow,
            IsActive = true,
            IsEmailConfirmed = false,
            TwoFactorEnabled = false,
        };
    }
}

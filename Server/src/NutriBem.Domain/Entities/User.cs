namespace NutriBem.Domain.Entities;

/// <summary>
/// The user entity, this entity represents each user at application.
/// </summary>
[Table("user")]
public class User
{
    [Key]
    public required Ulid Id { get; set; }

    [Required]
    [MaxLength(255)]
    public required string Email { get; set; }

    [MaxLength(255)]
    public string? PasswordHash { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsEmailConfirmed { get; set; } = false;
    public bool TwoFactorEnabled { get; set; } = false;

    public string TwoFactorSecret { get; set; } = string.Empty;



    #region Foreign Keys

    public UserProfile UserProfile { get; set; }
    public IEnumerable<PasswordResetToken> PasswordResetTokens { get; set; }
    public IEnumerable<ExternalLogin> ExternalLogins { get; set; }
    public IEnumerable<RefreshToken> RefreshTokens { get; set; }
    public IEnumerable<EmailConfirmation> EmailConfirmations { get; set; }

    #endregion

    public static User Create(string email, string passwordHash)
    {
        return new User
        {
            Id = Ulid.NewUlid(),
            Email = email,
            PasswordHash = passwordHash,
            CreatedAt = DateTime.UtcNow,
            IsActive = true,
            IsEmailConfirmed = false,
            TwoFactorEnabled = false,
        };
    }
}

namespace NutriBem.Domain.Entities;

public enum EAuthProviders {
    GITHUB, GOOGLE
}

[Table("external_login")]
public class ExternalLogin
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Ulid UserId { get; set; }

    [Required]
    public EAuthProviders Provider { get; set; } // e.g., "GitHub", "Google"

    [Required]
    [MaxLength(128)]
    public string ProviderKey { get; set; } // Unique identifier from the provider


    [ForeignKey("UserId")]
    public User User { get; set; }
}

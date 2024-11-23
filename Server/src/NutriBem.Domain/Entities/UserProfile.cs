namespace NutriBem.Domain.Entities;

[Table("user_profile")]
public class UserProfile
{
    [Key]
    public Ulid UserId { get; set; }

    [MaxLength(255)]
    public required string FirstName { get; set; }

    [MaxLength(255)]
    public string LastName { get; set; } = string.Empty;

    [MaxLength(15)]
    public string? PhoneNumber { get; set; } = string.Empty;

    public string? Address { get; set; } = string.Empty;

    public ushort? Age { get; set; }

    public ushort? Height { get; set; }
    
    public double? Weight { get; set; }

    public string? Sex { get; set; }

    public string? MainObjective { get; set; }


    public string? PhotoUrl { get; set; } = string.Empty;


    [ForeignKey(nameof(UserId))]
    public User User { get; set; }
}

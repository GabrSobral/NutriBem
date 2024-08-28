namespace NutriBem.Domain.Entities;

/// <summary>
/// The refresh token entity, this entity represents the refresh 
/// token instance at application.
/// </summary>
[Table("refresh_token")]
public class RefreshToken
{
    [Key]
    public required Ulid Id { get; set; }
    public required Ulid UserId { get; set; }
    public required ushort AvailableRefreshes { get; set; }
    public required DateTime ExpiryDate { get; set; }
    public required DateTime CreatedAt { get; set; }

    #region Foreign Keys

    [ForeignKey(nameof(UserId))]
    public User User { get; set; }

    #endregion

    public static RefreshToken Create(ushort availableRefreshes, Ulid userId, DateTime expiryDate)
    {
        return new RefreshToken
        {
            Id = Ulid.NewUlid(),
            UserId = userId,
            AvailableRefreshes = availableRefreshes,
            ExpiryDate = expiryDate,
            CreatedAt = DateTime.UtcNow
        };
    }
}

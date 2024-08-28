using System.Text;

namespace NutriBem.Domain.Entities;

[Table("password_reset_token")]
public class PasswordResetToken
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Ulid UserId { get; set; }

    [Required]
    [MaxLength(255)]
    public required string Token { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; }

    public static string GenerateRandomString(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var random = new Random();
        var result = new StringBuilder(length);

        for (int i = 0; i < length; i++)
        {
            result.Append(chars[random.Next(chars.Length)]);
        }

        return result.ToString();
    }
}

namespace NutriBem.Domain.Entities;

[Table("recipe_user")]
public class RecipeUser
{
    [Key]
    public required Ulid Id { get; set; }

    [Required]
    public required string RecipeId { get; set; }

    [Required]
    public required Ulid UserId { get; set; }

    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string? ImageUrl { get; set; }

    public required double Calories { get; set; }

    [ForeignKey(nameof(UserId))]
    public User User { get; set; }
}

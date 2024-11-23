namespace NutriBem.Application.Handlers.Recipes.SaveRecipe;

public record SaveRecipeCommand(
    Ulid AccountRequesterId,
    string RecipeId,
    string Title,
    string Description,
    double Calories,
    string? PhotoUrl
) : ICommand;

public record SaveRecipeRequest(
    string RecipeId,
    string Title,
    string Description,
    double Calories,
    string? PhotoUrl
);


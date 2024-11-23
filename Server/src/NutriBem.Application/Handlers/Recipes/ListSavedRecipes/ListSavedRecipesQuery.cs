namespace NutriBem.Application.Handlers.Recipes.ListSavedRecipes;

public record ListSavedRecipesQuery(
    Ulid AccountRequesterId    
): IQuery<List<ListSavedRecipesResponse>>;

public record ListSavedRecipesResponse(
    string RecipeId,
    string Title,
    string Description,
    double Calories,
    string? PhotoUrl
);

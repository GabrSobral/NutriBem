namespace NutriBem.Application.Handlers.Recipes.ListSavedRecipes;

public class ListSavedRecipesQueryHandler(
    DataContext dbContext
): IQueryHandler<ListSavedRecipesQuery, List<ListSavedRecipesResponse>>
{
    public async Task<List<ListSavedRecipesResponse>> Handle(ListSavedRecipesQuery request, CancellationToken cancellationToken)
    {
        return await dbContext.RecipesUser
            .AsNoTracking()
            .Select(x => new ListSavedRecipesResponse(x.RecipeId, x.Title, x.Description, x.Calories, x.ImageUrl))
            .ToListAsync(cancellationToken);
    }
}

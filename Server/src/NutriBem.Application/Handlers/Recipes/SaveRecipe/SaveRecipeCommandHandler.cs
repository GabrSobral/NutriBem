
namespace NutriBem.Application.Handlers.Recipes.SaveRecipe;

public class SaveRecipeCommandHandler(
    ILogger<SaveRecipeCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<SaveRecipeCommand>
{
    public async Task Handle(SaveRecipeCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Saving recipe...");

        var recipeUserDb = await dbContext.RecipesUser
            .Where(r => r.RecipeId == request.RecipeId && r.UserId == request.AccountRequesterId)
            .FirstOrDefaultAsync(cancellationToken);

        if (recipeUserDb == null)
        {
            var recipeUser = new RecipeUser
            {
                Id = Ulid.NewUlid(),
                RecipeId = request.RecipeId,
                UserId = request.AccountRequesterId,
                Title = request.Title,
                Description = request.Description,
                Calories = request.Calories,
                ImageUrl = request.PhotoUrl
            };

            await dbContext.RecipesUser.AddAsync(recipeUser, cancellationToken);
        } else
        {
            
            await dbContext.RecipesUser
                .Where(x => x.UserId == request.AccountRequesterId && x.RecipeId == request.RecipeId)
                .ExecuteDeleteAsync(cancellationToken);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

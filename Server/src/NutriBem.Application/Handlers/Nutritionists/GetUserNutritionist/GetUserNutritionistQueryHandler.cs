
namespace NutriBem.Application.Handlers.Nutritionists.GetUserNutritionist;

public class GetUserNutritionistQueryHandler(
    ILogger<GetUserNutritionistQueryHandler> logger,
    DataContext dbContext
    ) : IQueryHandler<GetUserNutritionistQuery, GetUserNutritionistResponse>
{
    public async Task<GetUserNutritionistResponse> Handle(
        GetUserNutritionistQuery query, 
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting user nutritionist...");

        var association = await dbContext.LinkAssociations
            .Include(x => x.NutritionistProfile)
                .ThenInclude(x => x.User)
                    .ThenInclude(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.UserId == query.AccountRequesterId, cancellationToken)
        ?? throw new NutritionistNotFound(query.AccountRequesterId);

        var dietPlan = await dbContext.DietPlans
            .AsNoTracking()
            .Where(x => x.PatientId == query.AccountRequesterId)
            .Select(x => new UserDietPlan(x.Id, x.Name, x.Description))
            .ToListAsync(cancellationToken);

        return new GetUserNutritionistResponse(
            association.UserId,
            association.NutritionistProfile.User.UserProfile.FirstName,
            association.NutritionistProfile.User.UserProfile.LastName,
            association.NutritionistProfile.User.UserProfile.PhotoUrl,
            association.NutritionistProfile.Crn,
            dietPlan
        );
    }
}
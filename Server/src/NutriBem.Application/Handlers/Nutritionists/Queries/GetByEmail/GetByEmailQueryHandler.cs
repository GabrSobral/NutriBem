namespace NutriBem.Application.Handlers.Nutritionists.Queries.GetByEmail;

public class GetByEmailQueryHandler(
    ILogger<GetByEmailQueryHandler> logger,
    DataContext dbContext
) : IQueryHandler<GetNutritionistByEmailQuery, GetNutritionistByEmailResponse>
{
    public async Task<GetNutritionistByEmailResponse> Handle(GetNutritionistByEmailQuery query, CancellationToken cancellationToken)
    {
        var nutriEmail = query.Email.ToLower();

        logger.LogInformation($"Searching for nutritionist e-mail: {nutriEmail}");

        var nutritionist = await dbContext.Nutritionists
            .AsNoTracking()
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Email == nutriEmail, cancellationToken)
            ?? throw new UserNotFoundException(nutriEmail);

        return new GetNutritionistByEmailResponse(nutritionist);
    }
}

namespace NutriBem.Application.Handlers.Nutritionists.Queries.GetById;

public class GetByIdQueryHandler(
    ILogger<GetByIdQueryHandler> logger,
    DataContext dbContext
) : IQueryHandler<GetNutritionistByIdQuery, GetNutritionistByIdResponse>
{
    public async Task<GetNutritionistByIdResponse> Handle(GetNutritionistByIdQuery query, CancellationToken cancellationToken)
    {
        var id = query.Id;

        logger.LogInformation($"Searching for user ID: {id}");

        var nutritionist = await dbContext.Nutritionists
            .AsNoTracking()
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
        ?? throw new UserNotFoundException(id);

        return new GetNutritionistByIdResponse(nutritionist);
    }
}

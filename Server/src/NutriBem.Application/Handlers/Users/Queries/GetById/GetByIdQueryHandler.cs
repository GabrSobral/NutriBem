namespace NutriBem.Application.Handlers.Users.Queries.GetById;

public class GetByIdQueryHandler(
    ILogger<GetByIdQueryHandler> logger,
    DataContext dbContext
) : IQueryHandler<GetByIdQuery, GetByIdResponse>
{
    public async Task<GetByIdResponse> Handle(GetByIdQuery query, CancellationToken cancellationToken)
    {
        var userId = query.Id;

        logger.LogInformation($"Searching for user ID: {userId}");

        var user = await dbContext.Users
            .AsNoTracking()
            .Include(x => x.UserProfile)
            .Include(x => x.NutritionistProfile)
            .FirstOrDefaultAsync(x => x.Id == userId, cancellationToken)
        ?? throw new UserNotFoundException(userId);

        return new GetByIdResponse(user);
    }
}

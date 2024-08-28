namespace NutriBem.Application.Handlers.Users.Queries.GetByEmail;

public class GetByEmailQueryHandler(
    ILogger<GetByEmailQueryHandler> logger,
    DataContext dbContext
) : IQueryHandler<GetByEmailQuery, GetByEmailResponse>
{
    public async Task<GetByEmailResponse> Handle(GetByEmailQuery query, CancellationToken cancellationToken)
    {
        var userEmail = query.Email.ToLower();

        logger.LogInformation($"Searching for user e-mail: {userEmail}");

        var user = await dbContext.Users
            .AsNoTracking()
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Email == userEmail, cancellationToken)
            ?? throw new UserNotFoundException(userEmail);

        return new GetByEmailResponse(user);
    }
}

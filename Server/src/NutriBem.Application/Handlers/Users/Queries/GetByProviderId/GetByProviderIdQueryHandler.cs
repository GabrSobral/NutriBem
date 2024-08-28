namespace NutriBem.Application.Handlers.Users.Queries.GetByProviderId;

public sealed class GetByProviderIdQueryHandler(
    ILogger<GetByProviderIdQueryHandler> logger,
    DataContext dbContext) : IQueryHandler<GetByProviderIdQuery, GetByProviderIdResponse>
{
    public async Task<GetByProviderIdResponse> Handle(GetByProviderIdQuery query, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Requesting {query.ProviderKey} on {Enum.GetName(query.Provider)} provider");

        var externalProvider = await dbContext.ExternalLogins
            .AsNoTracking()
            .Include(x => x.User)
            .ThenInclude(x => x.UserProfile)
            .SingleOrDefaultAsync(x => x.Provider == query.Provider && query.ProviderKey == x.ProviderKey, cancellationToken)
        ?? throw new UserNotFoundException();

        var user = externalProvider.User;

        return new GetByProviderIdResponse(
            Id: user.Id,
            Email: user.Email,
            FirstName: user.UserProfile.FirstName,
            LastName: user.UserProfile.LastName,
            CreatedAt: user.CreatedAt,
            IsEmailConfirmed: user.IsEmailConfirmed,
            UpdatedAt: user.UpdatedAt);
    }
}

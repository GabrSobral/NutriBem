namespace NutriBem.Application.Handlers.Authentication.RevokeAccessToken;

public sealed class RevokeAccessTokenCommandHandler(
    ILogger<RevokeAccessTokenCommandHandler> logger,

    IJsonWebToken _jsonWebToken,
    DataContext dbContext
) : ICommandHandler<RevokeAccessTokenCommand, RevokeAccessTokenResponse>
{
    public async Task<RevokeAccessTokenResponse> Handle(
        RevokeAccessTokenCommand command, 
        CancellationToken cancellationToken)
    {
        var decryptedToken = _jsonWebToken.DecryptToken<RevokeTokenClient>(command.RefreshToken)
            ?? throw new RefreshTokenDecryptException();

        var userIdFromToken = Ulid.Parse(decryptedToken.userIdentifier);

        var refreshToken = await dbContext.RefreshTokens
            .FirstOrDefaultAsync(x => x.UserId == userIdFromToken, cancellationToken)
        ?? throw new RefreshTokenUnavailableForUserException();

        if (refreshToken.AvailableRefreshes < 1)
        {
            dbContext.RefreshTokens.Remove(refreshToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            throw new RefreshTokenExpiredException();
        }

        if (refreshToken.ExpiryDate.CompareTo(DateTime.Now) < 0)
        {
            dbContext.RefreshTokens.Remove(refreshToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            throw new RefreshTokenExpiredException();
        }

        var user = await dbContext.Users
            .AsNoTracking()
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Id == userIdFromToken, cancellationToken)
        ?? throw new UserNotFoundException(userIdFromToken);

        var newToken = _jsonWebToken.Sign(new JsonWebTokenPayload(
            UserId: user.Id,
            Email: user.Email,
            FirstName: user.UserProfile.FirstName,
            LastName: user.UserProfile.LastName
        ));

        refreshToken.AvailableRefreshes -= 1;

        if (refreshToken.AvailableRefreshes == 0)
        {
            dbContext.RefreshTokens.Remove(refreshToken);
            logger.LogInformation($"The available refreshes reached to 0. The refresh token will be deleted.");
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation($"A new acces token was generated to {user.Id} user");

        return new RevokeAccessTokenResponse(newToken);
    }
}

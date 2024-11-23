namespace NutriBem.Application.Handlers.Authentication.SignIn;

public class SignInCommandHandler(
    ILogger<SignInCommandHandler> logger,

    IJsonWebToken jsonWebToken,
    IPasswordEncrypter passwordEncrypter,

    DataContext dbContext
) : ICommandHandler<SignInCommand, SignInResponse>
{
    public async Task<SignInResponse> Handle(SignInCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Email == command.Email.ToLower(), cancellationToken)
        ?? throw new EmailOrPasswordInvalidException();

        if (!user.IsActive)
            throw new UserNotActiveException(user.Email);

        if (!user.IsEmailConfirmed)
            throw new UserEmailNotConfirmedYetException(user.Id);

        bool isPasswordCorrect = passwordEncrypter.Compare(user.PasswordHash, command.Password, user.Id);

        if (!isPasswordCorrect)
            throw new EmailOrPasswordInvalidException();

        DateTime currentDate = DateTime.Now;
        DateTime futureDate = currentDate.AddDays(7).ToUniversalTime();

        await dbContext.RefreshTokens
            .Where(x => x.UserId == user.Id)
            .ExecuteDeleteAsync(cancellationToken);

        RefreshToken refreshToken = RefreshToken.Create(
            availableRefreshes: 5,
            userId: user.Id,
            expiryDate: futureDate
         );

        await dbContext.RefreshTokens.AddAsync(refreshToken, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation($"An user was logged at application: {user.Email}");

        var userProfile = await dbContext.UserProfiles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == user.Id, cancellationToken)
        ?? throw new UserNotFoundException(user.Id);

        var nutritionistProfile = await dbContext.NutritionistProfiles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == user.Id, cancellationToken);

        string token = jsonWebToken.Sign(new JsonWebTokenPayload(
            UserId: user.Id,
            Email: user.Email,
            FirstName: userProfile.FirstName ?? "",
            LastName: userProfile.LastName ?? ""
        ));

        string refreshTokenString = jsonWebToken.SignRefreshToken(refreshToken);
        
        user.UserProfile = userProfile;
        user.NutritionistProfile = nutritionistProfile;

        return new SignInResponse(user, token, refreshTokenString);
    }
}

namespace NutriBem.Application.Handlers.Authentication.SignUp;

public sealed class SignUpCommandHandler(
    ILogger<SignUpCommandHandler> logger,

    IJsonWebToken jsonWebToken,
    IPasswordEncrypter passwordEncrypter,

    IEmailSender emailSender,

    DataContext dbContext
) : ICommandHandler<SignUpCommand, SignInResponse>
{
    public async Task<SignInResponse> Handle(SignUpCommand command, CancellationToken cancellationToken)
    {
        var userId = Ulid.NewUlid();

        User newUser = new()
        {
            Id = userId,
            Email = command.Email.ToLower(),
            PasswordHash = passwordEncrypter.Encrypt(command.Password, userId),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null,
            IsEmailConfirmed = true
        };

        UserProfile userProfile = new()
        {
            UserId = userId,
            FirstName = command.FirstName,
            LastName = command.LastName,
        };

        string token = jsonWebToken.Sign(new JsonWebTokenPayload(
            UserId: newUser.Id,
            Email: newUser.Email,
            FirstName: userProfile.FirstName ?? "",
            LastName: userProfile.LastName ?? ""
        ));

        DateTime currentTime = DateTime.UtcNow;
        DateTime expiryDate = currentTime.AddDays(7).ToUniversalTime();

        var refreshToken = RefreshToken.Create(5, userId, expiryDate);

        await dbContext.RefreshTokens
            .Where(x => x.UserId == userId)
            .ExecuteDeleteAsync(cancellationToken);

        var refreshTokenString = jsonWebToken.SignRefreshToken(refreshToken);

        await dbContext.Users.AddAsync(newUser, cancellationToken);
        await dbContext.UserProfiles.AddAsync(userProfile, cancellationToken);
        await dbContext.RefreshTokens.AddAsync(refreshToken, cancellationToken);

        NutritionistProfile? nutritionistProfile = null;

        if(command.Crn != null || command.Crn != "")
        {
            nutritionistProfile = await CreateNutritionistProfileAsync(command.Crn, userId, cancellationToken);
        }

        newUser.NutritionistProfile = nutritionistProfile;

        //await SendEmailConfirmationAsync(newUser, cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation($"An user was created at application: {newUser.Email}");

        return new SignInResponse(newUser, token, refreshTokenString);
    }

    public async Task<NutritionistProfile> CreateNutritionistProfileAsync(string crn, Ulid userId,CancellationToken cancellationToken) {
        var nutritionistProfile = NutritionistProfile.Create(crn, userId);

        await dbContext.NutritionistProfiles.AddAsync(nutritionistProfile, cancellationToken);

        return nutritionistProfile;
    }

    private async Task<EmailConfirmation> SendEmailConfirmationAsync(User user, CancellationToken cancellationToken)
    {
        var emailconfirmation = EmailConfirmation.Create(user.Id);

        await dbContext.EmailConfirmations.AddAsync(emailconfirmation, cancellationToken);
        await emailSender.SendVerificationEmailAsync(user.Email, emailconfirmation, cancellationToken);

        return emailconfirmation;
    }
}

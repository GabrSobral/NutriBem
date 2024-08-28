namespace NutriBem.Application.Handlers.Authentication.ConfirmEmail;

public sealed class ConfirmEmailCommandHandler(
    ILogger<ConfirmEmailCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<ConfirmEmailCommand>
{
    public async Task Handle(ConfirmEmailCommand command, CancellationToken cancellationToken)
    {
        var emailVerification = await dbContext.EmailConfirmations
            .FirstOrDefaultAsync(x => x.Token == command.Token, cancellationToken)
        ?? throw new ConfirmationTokenInvalidException(command.Token);

        if (emailVerification.ExpiresAt.CompareTo(DateTime.Now) <= 0)
            throw new ConfirmationTokenAlreadyExpiredException(command.Token);

        if (emailVerification.IsUsed == true)
            throw new ConfirmationTokenAlreadyUsedException(command.Token);

        emailVerification.IsUsed = true;

        var user = await dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == emailVerification.UserId, cancellationToken)
        ?? throw new UserNotFoundException(emailVerification.Id);

        user.IsEmailConfirmed = true;

        dbContext.Users.Update(user);
        dbContext.EmailConfirmations.Update(emailVerification);

        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation("The user email was successfully confirmed.");
    }
}

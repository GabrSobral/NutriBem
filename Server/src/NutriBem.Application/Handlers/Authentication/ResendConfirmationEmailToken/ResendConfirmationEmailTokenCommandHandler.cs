namespace NutriBem.Application.Handlers.Authentication.ResendConfirmationEmailToken;

public sealed class ResendConfirmationEmailTokenCommandHandler(
    ILogger<ResendConfirmationEmailTokenCommandHandler> logger,
    DataContext dbContext,
    IEmailSender emailSender
) : ICommandHandler<ResendConfirmationEmailTokenCommand>
{
    public async Task Handle(ResendConfirmationEmailTokenCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Email == command.UserEmail, cancellationToken)
        ?? throw new UserNotFoundException(command.UserEmail);

        if (!user.IsActive)
            throw new UserNotActiveException(user.Email);

        await dbContext.EmailConfirmations
            .Where(x => x.UserId == user.Id)
            .ExecuteDeleteAsync(cancellationToken);

        var newUserConfirmationToken = EmailConfirmation.Create(user.Id);

        await dbContext.EmailConfirmations.AddAsync(newUserConfirmationToken, cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);

        await emailSender.SendVerificationEmailAsync(user.Email, newUserConfirmationToken, cancellationToken);

        logger.LogInformation($"The confirmation token was sent to {command.UserEmail} again.");
    }
}

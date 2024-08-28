namespace NutriBem.Application.Handlers.Authentication.ForgotPassword;

public sealed class ForgotPasswordCommandHandler(
    ILogger<ForgotPasswordCommandHandler> logger,
    DataContext dbContext,

    IPasswordEncrypter passwordEncrypter
) : ICommandHandler<ForgotPasswordCommand>
{
    public async Task Handle(ForgotPasswordCommand command, CancellationToken cancellationToken)
    {
        var passwordResetToken = await dbContext.PasswordResetTokens
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == command.PasswordResetId, cancellationToken)
        ?? throw new PasswordResetTokenNotFoundException(command.PasswordResetId);

        if (passwordResetToken.Token.Trim() != command.PasswordResetToken.Trim())
            throw new PasswordResetTokenDontMatchException(command.PasswordResetToken);
        
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == passwordResetToken.UserId, cancellationToken)
            ?? throw new UserNotFoundException(passwordResetToken.UserId);

        user.PasswordHash = passwordEncrypter.Encrypt<Ulid>(command.NewPassword, user.Id);

        await dbContext.RefreshTokens
            .Where(x => x.UserId == user.Id)
            .ExecuteDeleteAsync(cancellationToken);

        await dbContext.PasswordResetTokens
            .Where(x => x.UserId == user.Id)
            .ExecuteDeleteAsync(cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation($"The user password was updated: {user.Email}");
    }
}

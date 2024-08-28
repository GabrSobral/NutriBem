namespace NutriBem.Application.Handlers.Users.Commands.ChangePassword;

public sealed class ChangePasswordCommandHandler(
    ILogger<ChangePasswordCommandHandler> logger,
    IPasswordEncrypter passwordEncrypter,
    DataContext dbContext
) : ICommandHandler<ChangePasswordCommand>
{
    public async Task Handle(ChangePasswordCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
            ?? throw new UserNotFoundException(command.UserId);

        var isCurrentPasswordMatch = passwordEncrypter.Compare(user?.PasswordHash ?? "", command.CurrentPassword, user.Id);

        if (!isCurrentPasswordMatch)
            throw new CurrentPasswordNotMatchWithStoredException(user.Id);

        var newEncryptedPassword = passwordEncrypter.Encrypt(command.NewPassword, user.Id);

        user.PasswordHash = newEncryptedPassword;

        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation($"User {command.UserId} has successfully updated their password");
    }
}

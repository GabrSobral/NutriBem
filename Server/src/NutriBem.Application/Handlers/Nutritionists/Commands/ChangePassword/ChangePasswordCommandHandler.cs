namespace NutriBem.Application.Handlers.Nutritionists.Commands.ChangePassword;

public sealed class ChangeNutritionistPasswordCommandHandler(
    ILogger<ChangeNutritionistPasswordCommandHandler> logger,
    IPasswordEncrypter passwordEncrypter,
    DataContext dbContext
) : ICommandHandler<ChangeNutritionistPasswordCommand>
{
    public async Task Handle(ChangeNutritionistPasswordCommand command, CancellationToken cancellationToken)
    {
        var nutritionist = await dbContext.Nutritionists.FirstOrDefaultAsync(x => x.Id == command.NutritionistId, cancellationToken)
            ?? throw new UserNotFoundException(command.NutritionistId);

        var isCurrentPasswordMatch = passwordEncrypter.Compare(nutritionist?.PasswordHash ?? "", command.CurrentPassword, nutritionist.Id);

        if (!isCurrentPasswordMatch)
            throw new CurrentPasswordNotMatchWithStoredException(nutritionist.Id);

        var newEncryptedPassword = passwordEncrypter.Encrypt(command.NewPassword, nutritionist.Id);

        nutritionist.PasswordHash = newEncryptedPassword;

        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation($"Nutritionist {command.NutritionistId} has successfully updated their password");
    }
}

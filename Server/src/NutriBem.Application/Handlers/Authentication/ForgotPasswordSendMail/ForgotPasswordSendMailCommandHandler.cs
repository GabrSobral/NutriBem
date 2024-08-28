
namespace NutriBem.Application.Handlers.Authentication.ForgotPasswordSendMail;

public sealed class ForgotPasswordSendMailCommandHandler(
    ILogger<ForgotPasswordSendMailCommandHandler> logger,
    DataContext dbContext,
    IEmailSender emailSender
) : ICommandHandler<ForgotPasswordSendMailCommand>
{
    public async Task Handle(ForgotPasswordSendMailCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Email == command.Email, cancellationToken)
        ?? throw new UserNotFoundException(command.Email);

        var currentTime = DateTime.UtcNow;

        var passwordResetToken = new PasswordResetToken()
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            CreatedAt = currentTime,
            ExpiresAt = currentTime.AddMinutes(30),
            Token = PasswordResetToken.GenerateRandomString(128)
        };

        await dbContext.PasswordResetTokens.AddAsync(passwordResetToken, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        await emailSender.SendPasswordResetEmailAsync(user.Email, passwordResetToken, cancellationToken);
    }
}

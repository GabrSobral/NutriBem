namespace NutriBem.Domain.Interfaces;

public interface IEmailSender
{
    public Task SendVerificationEmailAsync(string email, EmailConfirmation emailConfirmation, CancellationToken cancellationToken);
    public Task SendPasswordResetEmailAsync(string email, PasswordResetToken emailConfirmation, CancellationToken cancellationToken);
}

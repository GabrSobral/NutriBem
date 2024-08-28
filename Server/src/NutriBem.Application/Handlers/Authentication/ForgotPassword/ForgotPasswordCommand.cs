namespace NutriBem.Application.Handlers.Authentication.ForgotPassword;

public record ForgotPasswordCommand(
    string PasswordResetToken,
    Guid PasswordResetId,
    string NewPassword
): ICommand;

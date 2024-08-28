namespace NutriBem.Domain.Exceptions;

public class PasswordResetTokenNotFoundException(Guid passwordResetTokenId): Exception($"The password reset token was not found: {passwordResetTokenId}")
{
}

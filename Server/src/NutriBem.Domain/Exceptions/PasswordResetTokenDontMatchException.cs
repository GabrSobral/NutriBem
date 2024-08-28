namespace NutriBem.Domain.Exceptions;

public class PasswordResetTokenDontMatchException(string passwordResetToken): Exception($"The password reset token do not match: {passwordResetToken}")
{
}

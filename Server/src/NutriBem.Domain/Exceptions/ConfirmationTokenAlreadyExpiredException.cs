namespace NutriBem.Domain.Exceptions;

public class ConfirmationTokenAlreadyExpiredException(Guid confirmationToken)
    : Exception($"Confirmation token was already expired: {confirmationToken}")
{
}

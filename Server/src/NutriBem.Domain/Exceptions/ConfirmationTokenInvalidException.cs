namespace NutriBem.Domain.Exceptions;

public class ConfirmationTokenInvalidException: Exception
{
    public ConfirmationTokenInvalidException(Guid conformationToken): base($"Confirmation token was invalid: {conformationToken}")
    {
        
    }
}

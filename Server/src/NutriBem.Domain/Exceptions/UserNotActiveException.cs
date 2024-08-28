namespace NutriBem.Domain.Exceptions;

public class UserNotActiveException : Exception
{
    public UserNotActiveException(Ulid userId): base($"User account is not active anymore: {userId}")
    {
        
    }

    public UserNotActiveException(string userEmail) : base($"User account is not active anymore: {userEmail}")
    {

    }
}

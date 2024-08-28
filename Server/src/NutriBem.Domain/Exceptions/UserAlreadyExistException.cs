namespace NutriBem.Domain.Exceptions;

public class UserAlreadyExistException : Exception
{
    public UserAlreadyExistException() : base("User already exists") { }
    public UserAlreadyExistException(string email) : base($"User already exists: {email}") { }
}

namespace NutriBem.Domain.Exceptions;

public class UserEmailNotConfirmedYetException : Exception
{
    public UserEmailNotConfirmedYetException(Ulid userId) : base($"The user e-mail was not confirmed yet: {userId}") { }
}

namespace NutriBem.Domain.Exceptions;

public class RefreshTokenUnavailableForUserException(): Exception("User do not have any refresh token available.")
{
}

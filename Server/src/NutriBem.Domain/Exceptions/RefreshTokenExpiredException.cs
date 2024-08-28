namespace NutriBem.Domain.Exceptions;

public class RefreshTokenExpiredException(): Exception("Your refresh token was expired.")
{
}

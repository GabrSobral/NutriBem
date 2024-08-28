namespace NutriBem.Domain.Interfaces.Authentication;

public record JsonWebTokenPayload(
    Ulid UserId,
    string Email,
    string FirstName,
    string? LastName
 );

public interface IJsonWebToken
{
    public string Sign(JsonWebTokenPayload user);

    public string SignRefreshToken(RefreshToken refreshToken);

    public T DecryptToken<T>(string token) where T : new();
}

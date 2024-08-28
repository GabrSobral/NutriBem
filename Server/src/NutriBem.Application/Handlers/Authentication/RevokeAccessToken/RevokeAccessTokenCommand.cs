namespace NutriBem.Application.Handlers.Authentication.RevokeAccessToken;

public record RevokeAccessTokenCommand(
    string RefreshToken
): ICommand<RevokeAccessTokenResponse>;

public record RevokeAccessTokenResponse(
    string AccessToken
);

public class RevokeTokenClient
{
    public string userIdentifier { get; set; }
    public int exp { get; set; }
    public string tokenKey { get; set; }
};

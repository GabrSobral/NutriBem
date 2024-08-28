namespace NutriBem.Application.Handlers.Authentication.SignIn;

public record SignInCommand(
    string Email,
    string Password
) : ICommand<SignInResponse>;

public record SignInResponse
{
    public UserResponse User { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }

    public SignInResponse(User user, string token, string refreshToken)
    {
        User = new UserResponse(
            user.Id,
            user.UserProfile.FirstName,
            user.UserProfile.LastName ?? "",
            user.Email,
            user.CreatedAt,
            user.UserProfile.PhotoUrl
        );
        AccessToken = token;
        RefreshToken = refreshToken;
    }
};

public record UserResponse(
    Ulid Id,
    string FirstName,
    string LastName,
    string Email,
    DateTime CreatedAt,
    string? PhotoUrl
);
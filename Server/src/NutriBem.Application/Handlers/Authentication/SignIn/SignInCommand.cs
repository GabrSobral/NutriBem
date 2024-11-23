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
            user.UserProfile.Address ?? "",
            user.Email,
            user.CreatedAt,
            user.UserProfile.PhotoUrl,
            user.NutritionistProfile?.Crn,
            user.UserProfile.Age,
            user.UserProfile.Weight,
            user.UserProfile.Sex,
            user.UserProfile.MainObjective
        );
        AccessToken = token;
        RefreshToken = refreshToken;
    }
};

public record UserResponse(
    Ulid Id,
    string FirstName,
    string LastName,
    string? Address,
    string Email,
    DateTime CreatedAt,
    string? PhotoUrl,
    string? Crn,
    ushort? Age,
    double? Weight,
    string? Sex,
    string? MainObjective
);
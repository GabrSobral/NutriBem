namespace NutriBem.Application.Handlers.Authentication.SignUp;

public record SignUpCommand(
    string? Crn,
    string FirstName,
    string LastName,
    string Email,
    string Password
) : ICommand<SignInResponse>;
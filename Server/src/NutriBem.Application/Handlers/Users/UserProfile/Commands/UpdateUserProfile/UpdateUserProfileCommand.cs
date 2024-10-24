namespace NutriBem.Application.Handlers.Users.UserProfile.Commands.UpdateUserProfile;
public record UpdateUserProfileCommand(
    Ulid UserId,
    string FirstName,
    string LastName,
    string Email,
    DateTime DateOfBirth,
    string PhoneNumber,
    string Address,
    string PhotoUrl
) : ICommand;

public record UpdateUserProfileRequest(
    string FirstName,
    string LastName,
    string Email,
    DateTime DateOfBirth,
    string PhoneNumber,
    string Address,
    string PhotoUrl
);

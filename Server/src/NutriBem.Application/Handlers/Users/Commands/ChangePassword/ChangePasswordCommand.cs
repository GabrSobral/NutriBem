namespace NutriBem.Application.Handlers.Users.Commands.ChangePassword;

public record ChangePasswordCommand(
    Ulid UserId,
    string CurrentPassword,
    string NewPassword
): ICommand;

public record ChangePasswordRequest(
    string CurrentPassword,
    string NewPassword
) : ICommand;

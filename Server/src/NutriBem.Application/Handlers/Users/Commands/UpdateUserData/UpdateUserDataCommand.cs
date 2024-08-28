namespace NutriBem.Application.Handlers.Users.Commands.UpdateUserData;

public record UpdateUserDataCommand(
    Ulid UserId,
    
    string? FirstName,
    string? LastName
): ICommand;

public record UpdateUserDataRequest(
    string? FirstName,
    string? LastName
);

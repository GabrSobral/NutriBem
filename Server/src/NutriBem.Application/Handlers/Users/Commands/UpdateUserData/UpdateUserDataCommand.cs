namespace NutriBem.Application.Handlers.Users.Commands.UpdateUserData;

public record UpdateUserDataCommand(
    Ulid UserId,
    
    string? FirstName,
    string? LastName,
    string? Address,

    ushort? Height,
    double? Weight,
    string? Sex,
    ushort? Age,
    string? MainObjective

) : ICommand;

public record UpdateUserDataRequest(
    string? FirstName,
    string? LastName,
    string? Address,

    ushort? Height,
    double? Weight,
    string? Sex,
    ushort? Age,
    string? MainObjective
);

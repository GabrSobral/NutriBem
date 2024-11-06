namespace NutriBem.Application.Handlers.Nutritionists.Commands.UpdateUserData;

public record UpdateNutritionistDataCommand(
    Ulid NutritionistId,
    
    string? FirstName,
    string? LastName
): ICommand;

public record UpdateNutritionistDataRequest(
    string? FirstName,
    string? LastName
);

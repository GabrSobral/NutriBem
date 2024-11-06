namespace NutriBem.Application.Handlers.Nutritionists.Commands.ChangePassword;

public record ChangeNutritionistPasswordCommand(
    Ulid NutritionistId,
    string CurrentPassword,
    string NewPassword
): ICommand;

public record ChangeNutritionistPasswordRequest(
    Ulid NutritionistId,
    string CurrentPassword,
    string NewPassword
) : ICommand;

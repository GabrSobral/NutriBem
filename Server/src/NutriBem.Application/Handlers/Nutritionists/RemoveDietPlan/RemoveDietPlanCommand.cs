namespace NutriBem.Application.Handlers.Nutritionists.RemoveDietPlan;

public record RemoveDietPlanCommand(
    Ulid AccountRequesterId,
    Ulid DietPlanId
) : ICommand;

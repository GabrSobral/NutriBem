namespace NutriBem.Application.Handlers.FoodPortion.DeleteFoodPortion;

public record DeleteFoodPortionCommand(
    int FoodPortionId
) : ICommand<DeleteFoodPortionResponse>;
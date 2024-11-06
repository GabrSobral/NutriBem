namespace NutriBem.Application.Handlers.FoodTracking.Delete;
public record DeleteFoodTrackingCommand(
    Ulid UserId,
    int FoodId
) : ICommand<DeleteFoodTrackingResponse>;

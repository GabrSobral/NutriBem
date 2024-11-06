namespace NutriBem.Application.Handlers.FoodTracking.Read;
public record GetFoodTrackingByUserIdCommand(
    Ulid UserId,
    int FoodId,
    string? FoodName,
    decimal FatCount,
    decimal ProteinCount,
    decimal CarbohydratesCount,
    DateTime RegisteredAt
) : ICommand<GetFoodTrackingByUserIdResponse>;

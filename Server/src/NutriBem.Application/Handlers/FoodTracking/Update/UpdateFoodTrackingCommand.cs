﻿namespace NutriBem.Application.Handlers.FoodTracking.Update;
public record UpdateFoodTrackingCommand(
    Ulid UserId,
    int FoodId,
    string? FoodName,
    decimal FatCount,
    decimal ProteinCount,
    decimal CarbohydratesCount,
    DateTime RegisteredAt
) : ICommand<UpdateFoodTrackingResponse>;

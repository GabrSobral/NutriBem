namespace NutriBem.Application.Handlers.Meals.UpdateMealFood;

public record UpdateMealFoodCommand(
    Ulid AccountRequesterId,
    Ulid MealFoodId,
    string? FoodId,
    string? FoodName,
    string? ServingId,
    string? ServingName,
    int? Quantity,

    int? ServingCalories,
    double? ServingCarbohydrates,
    double? ServingProteins,
    double? ServingFats
) : ICommand<UpdateMealFoodResponse>;

public record UpdateMealFoodRequest(
    string? FoodId,
    string? FoodName,
    string? ServingId,
    string? ServingName,
    int? Quantity,

    int? ServingCalories,
    double? ServingCarbohydrates,
    double? ServingProteins,
    double? ServingFats
);

public record UpdateMealFoodResponse(
    Ulid MealFoodId
);

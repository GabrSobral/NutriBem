namespace NutriBem.Application.Handlers.Meals.AddMealFood;

public record AddMealFoodCommand(
    Ulid AccountRequesterId,
    Ulid MealId,
    string FoodId,
    string FoodName,
    string ServingId,
    string ServingName,
    int Quantity,

    int? ServingCalories,
    double? ServingCarbohydrates,
    double? ServingProteins,
    double? ServingFats
) : ICommand<AddMealFoodResponse>;

public record AddMealFoodRequest(
    Ulid MealId,
    string FoodId,
    string FoodName,
    string ServingId,
    string ServingName,
    int Quantity,

    int? ServingCalories,
    double? ServingCarbohydrates,
    double? ServingProteins,
    double? ServingFats
);

public record AddMealFoodResponse(
    Ulid MealId
);

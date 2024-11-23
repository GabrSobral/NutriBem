namespace NutriBem.Application.Handlers.Meals.GetMealsByDate;

public record GetMealsByDateQuery(
    Ulid AccountRequesterId,
    DateTime Date
) : IQuery<GetMealsByDateQueryResponse>;

public record GetMealsByDateQueryRequest(
    DateOnly Date
);

public record GetMealsByDateQueryResponse(
    DateTime Date,
    List<MealByDate> Meals
);

public record MealByDate(
    Ulid Id,
    string Name,
    List<MealFood> EatenFoods,
    List<MealFood> DietPlanFoods
);

public record MealFood(
    Ulid Id,
    string FoodId,
    string FoodName,

    string ServingId,
    string ServingName,

    double ServingFats,
    double ServingCalories,
    double ServingProteins,
    double ServingCarbohydrates,

    int Quantity
);

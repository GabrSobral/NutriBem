namespace NutriBem.Application.Handlers.Nutritionists.ListDietPlans;

public record ListDietPlansQuery(
    Ulid AccountRequesterId    
): IQuery<List<DietPlanResponse>>;

public record DietPlanResponse(
    Ulid Id,
    string Name,
    string Description,
    string AdditionalNote,
    DateTime StartDate,
    DateTime EndDate,
    List<DietPlanMeal> Meals
);
public record DietPlanMeal(
    Ulid Id,
    string Name,
    double MaxKcal,
    List<MealFood> Foods
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


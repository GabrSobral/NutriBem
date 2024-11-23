namespace NutriBem.Application.Handlers.Nutritionists.UpdateDietPlan;

public record UpdateDietPlanCommand(
    Ulid AccountRequesterId,
    Ulid PatientId,
    Ulid DietPlanId,
    string Name,
    string Description,
    string AdditionalNote,
    DateTime StartDate,
    DateTime EndDate,
    List<UpdateDietPlanMeal> Meals
) : ICommand<UpdateDietPlanResponse>;

public record UpdateDietPlanRequest(
    string Name,
    string Description,
    string AdditionalNotes,
    DateTime StartDate,
    DateTime EndDate,
    List<UpdateDietPlanMeal> Meals
);

public record UpdateDietPlanMeal(
    Ulid Id,
    string Name,
    List<UpdateDietPlanMealFood> Foods
);

public record UpdateDietPlanMealFood(
    Ulid Id,
    string FoodId,
    string FoodName,

    string ServingId,
    string ServingName,

    double ServingFats,
    int ServingCalories,
    double ServingProteins,
    double ServingCarbohydrates,

    int Quantity
);

public record UpdateDietPlanResponse(
    Ulid DietPlanId
);
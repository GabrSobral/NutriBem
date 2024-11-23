namespace NutriBem.Application.Handlers.Nutritionists.CreateDietPlan;

public record CreateDietPlanCommand(
    Ulid AccountRequesterId,
    Ulid PatientId,
    string Name,
    string Description,
    string AdditionalNote,
    DateTime StartDate,
    DateTime EndDate,
    List<CreateDietPlanMeal> Meals
): ICommand<CreateDietPlanResponse>;

public record CreateDietPlanRequest(
    string Name,
    string Description,
    string AdditionalNotes,
    DateTime StartDate,
    DateTime EndDate,
    List<CreateDietPlanMeal> Meals
);

public record CreateDietPlanMeal(
    string Name,
    List<CreateDietPlanMealFood> Foods
);

public record CreateDietPlanMealFood(
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


public record CreateDietPlanResponse(
    Ulid DietPlanId    
);
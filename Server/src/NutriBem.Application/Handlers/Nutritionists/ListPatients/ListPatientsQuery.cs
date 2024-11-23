
namespace NutriBem.Application.Handlers.Nutritionists.ListPatients;

public record ListPatientsQuery(
    Ulid AccountsRequesterId
) : IQuery<List<ListPatientsResponse>>;

public record ListPatientsResponse(
    Ulid Id,
    string FirstName,
    string LastName,
    ushort? Age,
    ushort? Height,
    string? MainObjective,
    string? Address,
    string? PhotoUrl,
    List<DietPlanResponse> DietPlans
);

public record DietPlanResponse (
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

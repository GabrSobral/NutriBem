namespace NutriBem.Application.Handlers.Nutritionists.GetUserNutritionist;

public record GetUserNutritionistQuery(
    Ulid AccountRequesterId
): IQuery<GetUserNutritionistResponse>;

public record GetUserNutritionistResponse(
    Ulid Id,
    string FirstName,
    string LastName,
    string? PhotoUrl,
    string Crn,
    List<UserDietPlan> DietPlan
);

public record UserDietPlan(
    Ulid Id,
    string Name,
    string Description
);

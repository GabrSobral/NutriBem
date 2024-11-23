namespace NutriBem.Application.Handlers.Meals.AddMeal;

public record AddMealCommand(
    Ulid AccountRequesterId,
    string Name,
    ushort Order,
    DateTime RegisteredAt
) : ICommand<AddMealCommandResponse>;

public record AddMealRequest(
    string Name,
    ushort Order,
    DateTime RegisteredAt
);

public record AddMealCommandResponse(
    Ulid MealId
);

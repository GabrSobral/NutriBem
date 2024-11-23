namespace NutriBem.Application.Handlers.Meals.EatFood;

public record EatFoodCommand(
    Ulid AccountRequesterId,
    Ulid MealId,
    Ulid MealFoodId
) : ICommand;

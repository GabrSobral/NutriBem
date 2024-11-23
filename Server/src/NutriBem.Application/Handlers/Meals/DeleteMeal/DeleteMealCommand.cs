namespace NutriBem.Application.Handlers.Meals.DeleteMeal;

public record DeleteMealCommand(
    Ulid AccountRequesterId,
    Ulid MealId
): ICommand;

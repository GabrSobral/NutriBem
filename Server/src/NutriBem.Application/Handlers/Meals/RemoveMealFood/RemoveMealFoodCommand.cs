namespace NutriBem.Application.Handlers.Meals.RemoveMealFood;

public record RemoveMealFoodCommand(
    Ulid AccountRequesterId,
    Ulid MealFoodId    
): ICommand;

public record RemoveMealFoodRequest(
    Ulid MealFoodId
);

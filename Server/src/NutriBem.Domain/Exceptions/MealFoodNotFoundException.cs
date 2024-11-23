namespace NutriBem.Domain.Exceptions;

public class MealFoodNotFoundException : Exception
{
    public MealFoodNotFoundException() : base("Meal food not found") { }
    public MealFoodNotFoundException(Ulid mealFoodId) : base($"Meal food not found: {mealFoodId}") { }
}

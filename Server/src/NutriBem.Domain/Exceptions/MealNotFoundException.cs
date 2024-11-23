namespace NutriBem.Domain.Exceptions;

public class MealNotFoundException : Exception
{
    public MealNotFoundException() : base("Meal not found") { }
    public MealNotFoundException(Ulid mealId) : base($"Meal not found: {mealId}") { }
}

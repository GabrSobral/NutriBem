namespace NutriBem.Domain.Exceptions;
public sealed class FoodNotFoundException : Exception
{
    public FoodNotFoundException(int id) : base($"Food not found! Food ID: {id}") { }
}

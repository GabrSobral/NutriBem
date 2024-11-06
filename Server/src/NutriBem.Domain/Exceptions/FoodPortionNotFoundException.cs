namespace NutriBem.Domain.Exceptions;
public sealed class FoodPortionNotFoundException : Exception
{
    public FoodPortionNotFoundException(int id) : base($"Food portion not found!") { }
}

namespace NutriBem.Domain.Exceptions;
public sealed class FoodTrackingNotFoundException : Exception
{
    public FoodTrackingNotFoundException() : base($"Food tracking not found!") { }
}

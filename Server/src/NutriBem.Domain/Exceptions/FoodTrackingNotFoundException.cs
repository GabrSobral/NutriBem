namespace NutriBem.Domain.Exceptions;
public sealed class FoodTrackingNotFoundException : Exception
{
    public FoodTrackingNotFoundException() : base($"Food tracking not found!") { }
    public FoodTrackingNotFoundException( Ulid userId, DateTime date ) : base( $"{date}: No food tracking for today! (User {userId})" ) { }
}

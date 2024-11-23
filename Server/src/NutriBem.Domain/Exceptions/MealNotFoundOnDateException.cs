namespace NutriBem.Domain.Exceptions;

public sealed class MealNotFoundOnDateException : Exception
{
    public MealNotFoundOnDateException() : base($"Meal Not Found At Date!") { }
    public MealNotFoundOnDateException(DateTime date) : base($"{date}: No meal was found at the {date} date") { }
}
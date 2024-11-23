namespace NutriBem.Domain.Exceptions;

public class DietPlanNotFoundException : Exception
{
    public DietPlanNotFoundException(Ulid dietPlanId) : base($"Diet plan with id {dietPlanId} was not found.")
    {
    }
}

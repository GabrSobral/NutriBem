namespace NutriBem.Domain.Exceptions;

public class NutritionistNotFound : Exception
{
    public NutritionistNotFound(Ulid userId) : base($"Nutritionist Id not found {userId}") { }
}

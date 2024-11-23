namespace NutriBem.Domain.Exceptions;

public class AssociationAlreadyExistsException : Exception
{
    public AssociationAlreadyExistsException(Ulid userId, Ulid nutritionistId) 
        : base($"The user {userId} is already associated to {nutritionistId} nutritionist.") { }
}

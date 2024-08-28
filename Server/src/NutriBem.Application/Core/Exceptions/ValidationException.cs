namespace NutriBem.Application.Core.Exceptions;

public class ValidationException(IReadOnlyCollection<ValidationError> errors)
    : Exception("Validation failed")
{
    public IReadOnlyCollection<ValidationError> Errors { get; } = errors;
}

public record ValidationError(string PropertyName, string ErrorMessage);

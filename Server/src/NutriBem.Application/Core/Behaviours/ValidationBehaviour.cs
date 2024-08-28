namespace NutriBem.Application.Core.Behaviours;

/// <summary>
/// Represents the validation behaviour middleware.
/// </summary>
/// <typeparam name="TRequest">The request type.</typeparam>
/// <typeparam name="TResponse">The response type.</typeparam>
/// <remarks>
/// Initializes a new instance of the <see cref="ValidationBehaviour{TRequest,TResponse}"/> class.
/// </remarks>
/// <param name="validators">The validator for the current request type.</param>
public sealed class ValidationBehaviour<TRequest, TResponse>(
    IEnumerable<IValidator<TRequest>> validators) : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var context = new ValidationContext<TRequest>(request);

        var validationFailures = await Task.WhenAll(
            validators.Select(validator => validator.ValidateAsync(context))
        );

        var errors = validationFailures
            .Where(validationResult => !validationResult.IsValid)
            .SelectMany(validationResult => validationResult.Errors)
            .Select(validationFailure => new ValidationError(
                validationFailure.ErrorMessage,
                validationFailure.ErrorCode
            ))
        .ToList();

        if (errors.Count != 0)
            throw new Exceptions.ValidationException(errors);

        return await next();
    }
}

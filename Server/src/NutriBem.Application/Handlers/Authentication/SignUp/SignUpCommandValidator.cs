namespace NutriBem.Application.Handlers.Authentication.SignUp;

/// <summary>
/// 
/// </summary>
internal sealed class SignUpCommandValidator : AbstractValidator<SignUpCommand>
{
    public SignUpCommandValidator(DataContext dbContext)
    {
        RuleFor(x => x.Email)
            .NotNull().WithMessage("Email address cannot be null")
            .NotEmpty().WithMessage("Email address cannot be empty")
            .EmailAddress().WithMessage("Email address must be a valid email");

        RuleFor(x => x.Email)
            .MustAsync(async (email, cancellationToken) => {
                var existantUser = await dbContext.Users.AnyAsync(x => x.Email == email.ToLower(), cancellationToken);

                if (existantUser)
                    throw new UserAlreadyExistException();

                return true;
            }).WithMessage("User already exists");
    }
}

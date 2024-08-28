namespace NutriBem.Application.Handlers.Authentication.SignIn;

internal sealed class SignInCommandValidator : AbstractValidator<SignInCommand>
{
    public SignInCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotNull().WithMessage("Email address can't be nullable")
            .NotEmpty().WithMessage("Email address must be passed")
            .EmailAddress().WithMessage("Email address must be a valid email");

        RuleFor(x => x.Password)
            .NotNull().WithMessage("Password can't be nullable")
            .NotEmpty().WithMessage("Password must be passed");
    }
}

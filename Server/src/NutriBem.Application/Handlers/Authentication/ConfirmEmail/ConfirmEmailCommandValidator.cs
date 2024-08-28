namespace NutriBem.Application.Handlers.Authentication.ConfirmEmail;

public sealed class ConfirmEmailCommandValidator: AbstractValidator<ConfirmEmailCommand>
{
    public ConfirmEmailCommandValidator()
    {
        RuleFor(x => x.Token)
            .NotNull()
            .WithMessage("The confirmation token can not be null.");

        RuleFor(x => x.Token)
            .NotEmpty()
            .WithMessage("The confirmation token can not be empty.");
    }
}

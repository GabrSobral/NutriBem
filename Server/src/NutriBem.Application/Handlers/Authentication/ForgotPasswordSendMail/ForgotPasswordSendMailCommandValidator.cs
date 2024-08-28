namespace NutriBem.Application.Handlers.Authentication.ForgotPasswordSendMail;

public class ForgotPasswordSendMailCommandValidator: AbstractValidator<ForgotPasswordSendMailCommand>
{
    public ForgotPasswordSendMailCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotNull()
            .WithMessage("The e-mail field cannot be null.");
    }
}

namespace NutriBem.Application.Handlers.Authentication.ForgotPassword;

public class ForgotPasswordCommandValidator: AbstractValidator<ForgotPasswordCommand>
{
    public ForgotPasswordCommandValidator()
    {
        RuleFor(x => x.NewPassword)
            .NotNull()
            .WithMessage("The new password can not be null.");

        RuleFor(x => x.PasswordResetId)
            .NotNull()
            .WithMessage("The password reset ID can not be null.");

        RuleFor(x => x.PasswordResetToken)
            .NotNull()
            .WithMessage("The password reset token can not be null.");
    }
}

namespace NutriBem.Application.Handlers.Users.Commands.ChangePassword;

public sealed class ChangePasswordCommandValidator: AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordCommandValidator()
    {
        RuleFor(x => x.NewPassword)
            .NotNull();

        RuleFor(x => x.CurrentPassword)
            .NotNull();

        RuleFor(x => x.UserId)
            .NotNull();
    }
}

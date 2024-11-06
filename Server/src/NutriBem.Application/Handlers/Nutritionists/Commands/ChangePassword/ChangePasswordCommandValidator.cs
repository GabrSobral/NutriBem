namespace NutriBem.Application.Handlers.Nutritionists.Commands.ChangePassword;

public sealed class ChangePasswordCommandValidator: AbstractValidator<ChangeNutritionistPasswordCommand>
{
    public ChangePasswordCommandValidator()
    {
        RuleFor(x => x.NewPassword)
            .NotNull();

        RuleFor(x => x.CurrentPassword)
            .NotNull();

        RuleFor(x => x.NutritionistId)
            .NotNull();
    }
}

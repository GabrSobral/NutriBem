namespace NutriBem.Application.Handlers.Authentication.ExternalLoginProvider;

public sealed class ExternalLoginProviderCommandValidator : AbstractValidator<ExternalLoginProviderCommand>
{
    public ExternalLoginProviderCommandValidator()
    {
        //RuleFor(x => x.Email)
        //    .NotNull().WithMessage("Email address can't be nullable")
        //    .EmailAddress().WithMessage("Email address must be a valid email");

        //RuleFor(x => x.Provider)
        //    .NotNull().WithMessage("The provider field cannot be null")
        //    .Must(provider =>
        //    {
        //        List<EAuthProviders> allowedProviders = [EAuthProviders.GITHUB, EAuthProviders.GOOGLE];

        //        return allowedProviders.Contains(provider);
        //    }).WithMessage("The provider must be a valid provider: 1 or 2 (Github or Google)");

        //RuleFor(x => x.ProviderKey)
        //    .NotNull().WithMessage("The provider key can't be nullable");

        //RuleFor(x => x.FirstName)
        //    .NotNull().WithMessage("The first name can't be nullable");
    }
}

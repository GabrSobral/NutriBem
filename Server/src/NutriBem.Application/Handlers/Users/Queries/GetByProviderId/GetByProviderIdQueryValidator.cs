namespace NutriBem.Application.Handlers.Users.Queries.GetByProviderId;

public sealed class GetByProviderIdQueryValidator: AbstractValidator<GetByProviderIdQuery>
{
    public GetByProviderIdQueryValidator()
    {
        RuleFor(x => x.Provider)
            .NotNull().WithMessage("Provider can't be nullable");

        RuleFor(x => x.ProviderKey)
            .NotNull().WithMessage("Provider key can't be nullable");
    }
}

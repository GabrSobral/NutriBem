namespace NutriBem.Application.Handlers.Users.Queries.GetByProviderId;

public record GetByProviderIdQuery(
    EAuthProviders Provider,
    string ProviderKey): IQuery<GetByProviderIdResponse>;

public record GetByProviderIdResponse(
    Ulid Id,
    string FirstName,
    string? LastName,
    string Email,
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    bool IsEmailConfirmed);

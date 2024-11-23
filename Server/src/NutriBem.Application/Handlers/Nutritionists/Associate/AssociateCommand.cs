namespace NutriBem.Application.Handlers.Nutritionists.Associate;

public record AssociateCommand(
    Ulid AccountRequesterId,
    Ulid NutritionistId
) : ICommand<AssociateResponse>;

public record AssociateResponse(
    Ulid Id,
    string FirstName,
    string LastName,
    string Crn
);

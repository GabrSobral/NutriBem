namespace NutriBem.Application.Handlers.Nutritionists.Queries.GetById;

public record GetNutritionistByIdQuery(
    Ulid Id
) : IQuery<GetNutritionistByIdResponse>;

public record GetNutritionistByIdResponse
{
    public Ulid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string? PhotoUrl { get; set; }
    public DateTime CreatedAt { get; set; }

    public GetNutritionistByIdResponse(Nutritionist nutri)
    {
        Id = nutri.Id;
        FirstName = nutri.UserProfile.FirstName;
        LastName = nutri.UserProfile.LastName;
        Email = nutri.Email;
        PhotoUrl = nutri.UserProfile.PhotoUrl;
        CreatedAt = nutri.CreatedAt;
    }
};

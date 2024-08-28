namespace NutriBem.Application.Handlers.Users.Queries.GetById;

public record GetByIdQuery(
    Ulid Id
) : IQuery<GetByIdResponse>;

public record GetByIdResponse
{
    public Ulid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string? PhotoUrl { get; set; }
    public DateTime CreatedAt { get; set; }

    public GetByIdResponse(User user)
    {
        Id = user.Id;
        FirstName = user.UserProfile.FirstName;
        LastName = user.UserProfile.LastName;
        Email = user.Email;
        PhotoUrl = user.UserProfile.PhotoUrl;
        CreatedAt = user.CreatedAt;
    }
};

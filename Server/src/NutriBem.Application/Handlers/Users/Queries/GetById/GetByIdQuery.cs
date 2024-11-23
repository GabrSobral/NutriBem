namespace NutriBem.Application.Handlers.Users.Queries.GetById;

public record GetByIdQuery(
    Ulid Id
) : IQuery<GetByIdResponse>;

public record GetByIdResponse
{
    public Ulid Id { get; set; }
    public string FirstName { get; set; }
    public string? Crn { get; set; }
    public string? Address { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }

    public ushort? Height { get; set; }

    public double? Weight { get; set; }

    public ushort? Age { get; set; }

    public string? Sex { get; set; }

    public string? MainObjective { get; set; }

    public string? PhotoUrl { get; set; }
    public DateTime CreatedAt { get; set; }

    public GetByIdResponse(User user)
    {
        Id = user.Id;
        Crn = user.NutritionistProfile?.Crn;
        FirstName = user.UserProfile.FirstName;
        LastName = user.UserProfile.LastName;
        Address = user.UserProfile.Address;
        Email = user.Email;
        PhotoUrl = user.UserProfile.PhotoUrl;
        Age = user.UserProfile.Age;
        Height = user.UserProfile.Height;
        Weight = user.UserProfile.Weight;
        MainObjective = user.UserProfile.MainObjective;
        Sex = user.UserProfile.Sex;
        CreatedAt = user.CreatedAt;
    }
};

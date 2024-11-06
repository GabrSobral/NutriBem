﻿namespace NutriBem.Application.Handlers.Nutritionists.Queries.GetByCrn;

public record GetByCRNQuery(
    string CRN
) : IQuery<GetByCRNResponse>;

public record GetByCRNResponse
{
    public Ulid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string? PhotoUrl { get; set; }
    public DateTime CreatedAt { get; set; }

    public GetByCRNResponse(Nutritionist nutritionists)
    {
        Id = nutritionists.Id;
        FirstName = nutritionists.UserProfile.FirstName;
        LastName = nutritionists.UserProfile.LastName;
        Email = nutritionists.Email;
        PhotoUrl = nutritionists.UserProfile.PhotoUrl;
        CreatedAt = nutritionists.CreatedAt;
    }
};
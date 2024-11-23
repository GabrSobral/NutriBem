namespace NutriBem.Presentation.Http.Utils;

public static class HttpUserClaims
{
    public static Ulid GetId(HttpContext? httpContext)
    {
        var userIdString = httpContext?.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier || x.Type == "userIdentifier")?.Value
            ?? throw new UserNotFoundException();

        var userId = Ulid.Parse(userIdString);

        return userId;
    }
}

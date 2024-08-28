namespace NutriBem.Application.Core;

public class JwtOptions
{
    public string Issuer { get; init; } = string.Empty;
    public string Audience { get; init; } = string.Empty;
    public string SecretKey { get; init; } = string.Empty;

    public int ExpireMinutes { get; } = 3600; // just for development
}


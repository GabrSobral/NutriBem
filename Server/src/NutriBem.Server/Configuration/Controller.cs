namespace NutriBem.Server.Configuration;

public static class Controller
{
    public static IServiceCollection ConfigureController(this IServiceCollection services)
    {
        services.AddControllers()
            .AddApplicationPart(PresentationAssemblyReference.Assembly);

        return services;
    }
}

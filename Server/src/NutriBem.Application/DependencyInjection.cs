namespace NutriBem.Application;

/// <summary>
/// Contains the extensions method for registering dependencies in the DI framework.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Registers the necessary services with the DI framework.
    /// </summary>
    /// <param name="services">The service collection.</param>
    /// <returns>The same service collection.</returns>
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IJsonWebToken, JsonWebToken>();
        services.AddSingleton<IPasswordEncrypter, PasswordEncrypter>();

        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(ApplicationAssemblyReference.Assembly);

            config.AddOpenBehavior(typeof(ValidationBehaviour<,>));
        });

        services.AddValidatorsFromAssemblyContaining(typeof(ApplicationAssemblyReference), includeInternalTypes: true);

        return services;
    }
}

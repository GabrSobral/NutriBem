namespace NutriBem.Infra.Email;

public static class DependenyInjection
{
    public static IServiceCollection AddInfraEmailService(this IServiceCollection services)
    {
        services.AddScoped<IEmailSender, EmailSender>();

        return services;
    }
}

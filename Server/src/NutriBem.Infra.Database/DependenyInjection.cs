namespace NutriBem.Infra.Database;

public static class DependenyInjection
{
    public static IServiceCollection AddInfraDatabase(this IServiceCollection services, IConfiguration configuration)
    {

        string connectionString = configuration.GetConnectionString("PostgreSql")!;

        services.AddDbContext<DataContext>(options => options.UseNpgsql(connectionString));

        return services;
    }
}

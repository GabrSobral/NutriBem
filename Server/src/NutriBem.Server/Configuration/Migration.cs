namespace NutriBem.Server.Configuration;

public static class Migration
{
    /// <summary>
    /// Configures the migrations.
    /// </summary>
    /// <param name="app">The app.</param>
    /// <exception cref="Exception"></exception>
    /// <returns>An IApplicationBuilder.</returns>
    public static IApplicationBuilder ConfigureMigrations(this IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>()?.CreateScope();

        var context = serviceScope?.ServiceProvider.GetRequiredService<DataContext>();

        if (context != null)
        {
            try
            {
                var pendingMigrations = context.Database.GetPendingMigrations();
                if (pendingMigrations != null && pendingMigrations.Any())
                {
                    context.Database.Migrate();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        return app;
    }
}

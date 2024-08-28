internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services
            .ConfigureOptions(builder.Configuration)
            .AddApplication()
            .AddInfraDatabase(builder.Configuration)
            .AddInfraEmailService()
            .AddPresentation()
            .ConfigureCors()
            .ConfigureController()
            .ConfigureAuthentication()
            .ConfigureApiDocumentation();

        var app = builder.Build();

        app.ConfigureApiDocumentationUI(app.Environment.IsDevelopment());

        app.ConfigureMiddlewares();
        app.ConfigureEndPoints();
        app.ConfigureMigrations();

        app.Run();
    }
}
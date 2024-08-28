using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using NutriBem.Infra.Database.Contexts;

using System.Text;
using System.Data.Common;

namespace NutriBem.Server.Integration.Config;

public class CustomWebApplicationFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        Environment.SetEnvironmentVariable("TESTING", "true");

        builder.ConfigureTestServices(services =>
        {
            services.Remove(services.SingleOrDefault(s => s.ServiceType == typeof(DbConnection))!);
            services.Remove(services.SingleOrDefault(s => s.ServiceType == typeof(DbContextOptions<DataContext>))!);

            services.AddSingleton<DbConnection>(container =>
            {
                var connection = new SqliteConnection("DataSource==:memory");
                connection.Open();

                return connection;
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer("Token", options =>
                {
                    options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ema123msad9!dasd%sd!dasd123ddaw123!#5%^Tdas9)"));
                    options.TokenValidationParameters.ValidateAudience = false;
                    options.TokenValidationParameters.ValidateIssuer = false;
                    options.TokenValidationParameters.ValidateLifetime = false;
                    options.TokenValidationParameters.ValidateIssuerSigningKey = false;
                });

            services.AddAuthorization();

            services.AddDbContext<DataContext>((container, options) =>
            {
                options.UseInMemoryDatabase("ProxyMityAuth");
            });

            builder.UseEnvironment("Development");

            using var scope = services.BuildServiceProvider().CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();

            dbContext.Database.EnsureDeleted();
        });
    }
}

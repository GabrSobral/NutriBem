namespace NutriBem.Infra.Database.Contexts;

public class DataContext : DbContext
{
    public DataContext() { }

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Nutritionist> Nutritionists {  get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<ExternalLogin> ExternalLogins { get; set; }
    public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<EmailConfirmation> EmailConfirmations { get; set; }
    public DbSet<Food> Food { get; set; }
    public DbSet<DailyFoodTracking> DailyFoodTrackings { get; set; }
    public DbSet<FoodPortion> FoodPortion { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique index on Email
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<PasswordResetToken>()
            .HasIndex(prt => prt.Token);

        modelBuilder.Entity<RefreshToken>()
            .HasIndex(rt => rt.UserId);

        modelBuilder.Entity<EmailConfirmation>()
            .HasIndex(ec => ec.Token);

        modelBuilder.Entity<ExternalLogin>()
            .HasIndex(el => new { el.Provider, el.ProviderKey })
            .IsUnique();
    }

    /// <summary>
    /// Method to parse the ULID for database and EF Core
    /// </summary>
    /// <param name="configurationBuilder"></param>
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder
            .Properties<Ulid>()
            .HaveConversion<UlidToStringConverter>();
    }
}

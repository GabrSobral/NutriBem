namespace NutriBem.Infra.Database.Contexts;

public class DataContext : DbContext
{
    public DataContext() { }

    public DataContext(DbContextOptions<DataContext> options) : base(options) 
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<RecipeUser> RecipesUser { get; set; }
    public DbSet<NutritionistProfile> NutritionistProfiles {  get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<ExternalLogin> ExternalLogins { get; set; }
    public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<EmailConfirmation> EmailConfirmations { get; set; }
    public DbSet<Meal> Meals{ get; set; }
    public DbSet<MealFood> MealFoods{ get; set; }
    public DbSet<LinkAssociation> LinkAssociations { get; set; }
    public DbSet<DietPlan> DietPlans { get; set; }

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

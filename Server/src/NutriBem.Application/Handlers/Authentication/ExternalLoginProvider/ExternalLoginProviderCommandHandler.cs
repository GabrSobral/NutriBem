namespace NutriBem.Application.Handlers.Authentication.ExternalLoginProvider;

/// <summary>
/// 
/// </summary>
/// <param name="logger"></param>
/// <param name="dbContext"></param>
public sealed class ExternalLoginProviderCommandHandler(
    ILogger<ExternalLoginProviderCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<ExternalLoginProviderCommand, ExternalLoginProviderResponse>
{
    public async Task<ExternalLoginProviderResponse> Handle(ExternalLoginProviderCommand command, CancellationToken cancellationToken)
    {
        var externalLogin = await dbContext.ExternalLogins
            .AsNoTracking()
            .Include(x => x.User)
            .ThenInclude(x => x.UserProfile)
            .SingleOrDefaultAsync(x => x.Provider == command.Provider && x.ProviderKey == command.ProviderKey, cancellationToken);
    
        if (externalLogin is not null)
        {
            return new ExternalLoginProviderResponse(
                Id: externalLogin.User.Id,
                Email: externalLogin.User.Email,
                FirstName: externalLogin.User.UserProfile.FirstName,
                LastName: externalLogin.User.UserProfile.LastName,
                CreatedAt: externalLogin.User.CreatedAt,
                IsEmailConfirmed: externalLogin.User.IsEmailConfirmed,
                UpdatedAt: externalLogin.User.UpdatedAt);
        }

        var user = await dbContext.Users
            .SingleOrDefaultAsync(u => u.Email == command.Email.ToLower(), cancellationToken);

        if (user is null)
        {
            var userId = Ulid.NewUlid();

            user = new User
            {
                Id = userId,
                Email = command.Email.ToLower(),
                PasswordHash = null, // Not needed for OAuth users
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true,
                IsEmailConfirmed = true, // Usually confirmed via OAuth provider
                TwoFactorEnabled = false,
                UserProfile = new UserProfile
                {
                    UserId = userId,
                    FirstName = command.FirstName,
                    LastName = command.LastName ?? string.Empty
                }
            };

            await dbContext.Users.AddAsync(user, cancellationToken);
        }

        var newExternalLogin = new ExternalLogin
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Provider = command.Provider,
            ProviderKey = command.ProviderKey
        };

        await dbContext.ExternalLogins.AddAsync(newExternalLogin, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new ExternalLoginProviderResponse(
            Id: user.Id,
            Email: user.Email.ToLower(),
            FirstName: user.UserProfile.FirstName,
            LastName: user.UserProfile.LastName,
            CreatedAt: user.CreatedAt,
            IsEmailConfirmed: user.IsEmailConfirmed,
            UpdatedAt: user.UpdatedAt);
    }
}

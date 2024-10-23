namespace NutriBem.Application.Handlers.Users.UserProfile.Commands.UpdateUserProfile;

public sealed class UpdateUserProfileCommandHandler : ICommandHandler<UpdateUserProfileCommand>
{
    private readonly DataContext _dbContext;

    public UpdateUserProfileCommandHandler(DataContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(UpdateUserProfileCommand command, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
        ?? throw new UserNotFoundException(command.UserId);

        user.UserProfile.FirstName = command.FirstName;
        user.UserProfile.LastName = command.LastName;
        user.UserProfile.PhoneNumber = command.PhoneNumber;
        user.UserProfile.Address = command.Address;
        user.UserProfile.PhotoUrl = command.PhotoUrl;

        _dbContext.Users.Update(user);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
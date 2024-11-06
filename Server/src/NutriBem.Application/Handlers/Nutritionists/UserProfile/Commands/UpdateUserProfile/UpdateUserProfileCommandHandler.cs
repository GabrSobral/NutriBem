namespace NutriBem.Application.Handlers.Nutritionists.UserProfile.Commands.UpdateUserProfile;

public sealed class UpdateUserProfileCommandHandler : ICommandHandler<UpdateUserProfileCommand>
{
    private readonly DataContext _dbContext;

    public UpdateUserProfileCommandHandler(DataContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(UpdateUserProfileCommand command, CancellationToken cancellationToken)
    {
        var nutri = await _dbContext.Nutritionists
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
        ?? throw new UserNotFoundException(command.UserId);

        nutri.UserProfile.FirstName = command.FirstName;
        nutri.UserProfile.LastName = command.LastName;
        nutri.UserProfile.PhoneNumber = command.PhoneNumber;
        nutri.UserProfile.Address = command.Address;
        nutri.UserProfile.PhotoUrl = command.PhotoUrl;

        _dbContext.Nutritionists.Update(nutri);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
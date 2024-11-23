namespace NutriBem.Application.Handlers.Users.Commands.UpdateUserData;

/// <summary>
/// 
/// </summary>
public sealed class UpdateUserDataCommandHandler(
    DataContext dbContext) : ICommandHandler<UpdateUserDataCommand>
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="command"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task Handle(UpdateUserDataCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
        ?? throw new UserNotFoundException(command.UserId);

        user.UserProfile.FirstName = command.FirstName ?? user.UserProfile.FirstName;
        user.UserProfile.LastName = command.LastName ?? user.UserProfile.LastName;
        user.UserProfile.Height = command.Height ?? user.UserProfile.Height;
        user.UserProfile.Weight = command.Weight ?? user.UserProfile.Weight;
        user.UserProfile.Age = command.Age ?? user.UserProfile.Age;
        user.UserProfile.Address = command.Address ?? user.UserProfile.Address;
        user.UserProfile.Sex = command.Sex ?? user.UserProfile.Sex;
        user.UserProfile.MainObjective = command.MainObjective ?? user.UserProfile.MainObjective;

        dbContext.Users.Update(user);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

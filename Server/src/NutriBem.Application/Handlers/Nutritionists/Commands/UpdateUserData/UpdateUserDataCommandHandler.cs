namespace NutriBem.Application.Handlers.Nutritionists.Commands.UpdateUserData;

public sealed class UpdateNutritionistDataCommandHandler(
    DataContext dbContext) : ICommandHandler<UpdateNutritionistDataCommand>
{
    public async Task Handle(UpdateNutritionistDataCommand command, CancellationToken cancellationToken)
    {
        var nutritionist = await dbContext.Nutritionists
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Id == command.NutritionistId, cancellationToken)
        ?? throw new UserNotFoundException(command.NutritionistId);

        nutritionist.UserProfile.FirstName = command.FirstName ?? nutritionist.UserProfile.FirstName;
        nutritionist.UserProfile.LastName = command.LastName ?? nutritionist.UserProfile.LastName;

        dbContext.Nutritionists.Update(nutritionist);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

namespace NutriBem.Application.Handlers.Nutritionists.Associate;

public class AssociateCommandHandler(
    ILogger<AssociateCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<AssociateCommand, AssociateResponse>
{
    public async Task<AssociateResponse> Handle(AssociateCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Associating nutritionist...");

        var linkAssociation = await dbContext.LinkAssociations
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == command.AccountRequesterId && x.NutritionistId == command.NutritionistId, cancellationToken);

        if(linkAssociation != null)
        {
            throw new AssociationAlreadyExistsException(command.AccountRequesterId, command.NutritionistId);
        }

        var nutritionist = await dbContext.NutritionistProfiles
            .Include(x => x.User)
            .Include(x => x.User.UserProfile)
            .FirstOrDefaultAsync(x => x.UserId == command.NutritionistId, cancellationToken)
        ?? throw new NutritionistNotFound(command.NutritionistId);

        var association = LinkAssociation.Create(command.AccountRequesterId, command.NutritionistId);

        await dbContext.LinkAssociations.AddAsync(association, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new AssociateResponse(
            nutritionist.UserId, 
            nutritionist.User.UserProfile.FirstName, 
            nutritionist.User.UserProfile.LastName,
            nutritionist.Crn
        );
    }
}

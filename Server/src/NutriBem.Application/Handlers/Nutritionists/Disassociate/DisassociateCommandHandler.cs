
namespace NutriBem.Application.Handlers.Nutritionists.Disassociate;

public class DisassociateCommandHandler(
    ILogger<DisassociateCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<DisassociateCommand>
{
    public async Task Handle(DisassociateCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Disassociating nutritionist...");

        var association = await dbContext.LinkAssociations
            .Where(x => x.UserId == command.AccountRequesterId && x.NutritionistId == command.NutritionistId)
            .ExecuteDeleteAsync(cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

namespace NutriBem.Application.Handlers.Nutritionists.RemoveDietPlan;

public class RemoveDietPlanCommandHandler(
    ILogger<RemoveDietPlanCommandHandler> logger,
    DataContext dbContext
) : ICommandHandler<RemoveDietPlanCommand>
{
    public async Task Handle(RemoveDietPlanCommand command, CancellationToken cancellationToken)
    {
        logger.LogInformation("Removing diet plan {DietPlanId}...", command.DietPlanId);

        await dbContext.Meals
            .Where(d => d.DietPlanId == command.DietPlanId)
            .ExecuteDeleteAsync(cancellationToken);

        await dbContext.DietPlans
            .Where(d => d.Id == command.DietPlanId)
            .ExecuteDeleteAsync(cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

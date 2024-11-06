namespace NutriBem.Application.Handlers.FoodTracking.Delete;

public class DeleteFoodTrackingCommandHandler(
    DataContext dbContext
) : ICommandHandler<DeleteFoodTrackingCommand, DeleteFoodTrackingResponse>
{
    public async Task<DeleteFoodTrackingResponse> Handle(DeleteFoodTrackingCommand request, CancellationToken cancellationToken)
    {
        var foodTracking = await dbContext.DailyFoodTrackings
            .Where(x => x.UserId == request.UserId && x.FoodId == request.FoodId)
            .FirstOrDefaultAsync(cancellationToken);

        if (foodTracking is null)
        {
            throw new FoodTrackingNotFoundException();
        }

        dbContext.DailyFoodTrackings.Remove(foodTracking);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new DeleteFoodTrackingResponse();
    }
}
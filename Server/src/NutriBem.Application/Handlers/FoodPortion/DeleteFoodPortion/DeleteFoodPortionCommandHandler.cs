namespace NutriBem.Application.Handlers.FoodPortion.DeleteFoodPortion;

public class DeleteFoodPortionCommandHandler(
    DataContext dbContext
) : ICommandHandler<DeleteFoodPortionCommand, DeleteFoodPortionResponse>
{
    public async Task<DeleteFoodPortionResponse> Handle(DeleteFoodPortionCommand request, CancellationToken cancellationToken)
    {
        var foodPortion = await dbContext.FoodPortion
            .Where(x => x.Id == request.FoodPortionId)
            .FirstOrDefaultAsync(cancellationToken);

        if (foodPortion is null)
        {
            throw new FoodPortionNotFoundException(request.FoodPortionId);
        }

        dbContext.FoodPortion.Remove(foodPortion);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new DeleteFoodPortionResponse();
    }
}
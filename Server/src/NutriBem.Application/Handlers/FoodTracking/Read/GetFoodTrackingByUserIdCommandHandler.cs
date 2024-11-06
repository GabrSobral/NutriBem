namespace  NutriBem.Application.Handlers.FoodTracking.Read;

public class GetFoodTrackingByUserIdCommandHandler(
    DataContext dbContext
) : ICommand<GetFoodTrackingByUserIdCommand>
{
    public async Task<GetFoodTrackingByUserIdResponse> Handle(GetFoodTrackingByUserIdCommand command)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == command.UserId);

        if (user == null)
        {
            throw new UserNotFoundException("User not found");
        }

        var dailyFoodTrackings = await dbContext.DailyFoodTrackings
            .Where(x => x.UserId == command.UserId && x.RegisteredAt.Date == command.RegisteredAt.Date)
            .FirstOrDefaultAsync();

        if (dailyFoodTrackings == null)
        {
            throw new FoodTrackingNotFoundException(command.UserId, command.RegisteredAt);
        }

        return new GetFoodTrackingByUserIdResponse
        {
            UserId = dailyFoodTrackings.UserId,
            FoodId = dailyFoodTrackings.FoodId,
            FoodName = dailyFoodTrackings.FoodName,
            FatCount = dailyFoodTrackings.FatCount,
            ProteinCount = dailyFoodTrackings.ProteinCount,
            CarbohydratesCount = dailyFoodTrackings.CarbohydratesCount,
            RegisteredAt = dailyFoodTrackings.RegisteredAt
        };
    }
}
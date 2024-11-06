namespace NutriBem.Application.Handlers.FoodTracking.Create;
public class CreateFoodTrackingCommandHandler(
    DataContext dbContext
) : ICommandHandler<CreateFoodTrackingCommand, CreateFoodTrackingResponse>
{
    public async Task<CreateFoodTrackingResponse> Handle(CreateFoodTrackingCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == command.UserId);

        if (user == null)
        {
            throw new UserNotFoundException("User not found");
        }

        var food = await dbContext.Food.FirstOrDefaultAsync(x => x.Id == command.FoodId);

        if (food == null)
        {
            throw new FoodNotFoundException(command.FoodId);
        }

        var dailyFoodTracking = new DailyFoodTracking
        {
            Id = Ulid.NewUlid(),
            UserId = command.UserId,
            FoodId = command.FoodId,
            FoodName = food.Description,
            FatCount = command.FatCount,
            ProteinCount = command.ProteinCount,
            CarbohydratesCount = command.CarbohydratesCount,
            RegisteredAt = DateTime.Now
        };

        await dbContext.DailyFoodTrackings.AddAsync(dailyFoodTracking);
        await dbContext.SaveChangesAsync();

        return new CreateFoodTrackingResponse
        {
            Id = dailyFoodTracking.Id,
            UserId = dailyFoodTracking.UserId,
            FoodId = dailyFoodTracking.FoodId,
            FoodName = dailyFoodTracking.FoodName,
            FatCount = dailyFoodTracking.FatCount,
            ProteinCount = dailyFoodTracking.ProteinCount,
            CarbohydratesCount = dailyFoodTracking.CarbohydratesCount,
            RegisteredAt = dailyFoodTracking.RegisteredAt
        };
    }
}


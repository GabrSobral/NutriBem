namespace NutriBem.Application.Handlers.Food.GetFood;

public class GetFoodCommandHandler(
    DataContext dbContext
) : ICommandHandler<GetFoodCommand, GetFoodResponse>
{
    public async Task<GetFoodResponse> Handle(GetFoodCommand command, CancellationToken cancellationToken)
    {
        var food = await dbContext.Food
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken)
        ?? throw new FoodNotFoundException(command.Id);

        return new GetFoodResponse
        {
            Id = food.Id,
            FoodCategoryId = food.FoodCategoryId,
            FdcId = food.FdcId,
            FoodClass = food.FoodClass,
            Description = food.Description,
            FoodCode = food.FoodCode,
            PublicationDate = food.PublicationDate,
            StartDate = food.StartDate,
            EndDate = food.EndDate,
            UnitName = food.UnitName,
            DataType = food.DataType
        };
    }
}
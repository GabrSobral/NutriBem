namespace NutriBem.Application.Handlers.Food.RegisterFood;

public class RegisterFoodCommandHandler(
    DataContext dbContext
) : ICommandHandler<RegisterFoodCommand, RegisterFoodResponse>
{
    public async Task<RegisterFoodResponse> Handle(RegisterFoodCommand command, CancellationToken cancellationToken)
    {
        var food = new Domain.Entities.Food
        {
            Id = command.Id,
            FoodCategoryId = command.FoodCategoryId,
            FdcId = command.FdcId,
            FoodClass = command.FoodClass,
            Description = command.Description,
            FoodCode = command.FoodCode,
            PublicationDate = command.PublicationDate,
            StartDate = command.StartDate,
            EndDate = command.EndDate,
            UnitName = command.UnitName,
            DataType = command.DataType
        };

        await dbContext.Food.AddAsync(food, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new RegisterFoodResponse
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
namespace NutriBem.Application.Handlers.Food.RegisterFood;

public record RegisterFoodCommand(
    int Id,
    int FoodCategoryId,
    int FdcId,
    string FoodClass,
    string Description,
    string FoodCode,
    DateTime PublicationDate,
    DateTime StartDate,
    DateTime EndDate,
    string UnitName,
    string DataType
) : ICommand<RegisterFoodResponse>;
namespace NutriBem.Application.Handlers.Food.GetFood;

public record GetFoodCommand(int Id) : ICommand<GetFoodResponse>;
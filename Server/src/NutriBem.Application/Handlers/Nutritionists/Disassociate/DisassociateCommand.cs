namespace NutriBem.Application.Handlers.Nutritionists.Disassociate;

public record DisassociateCommand(
    Ulid AccountRequesterId, 
    Ulid NutritionistId
) : ICommand;
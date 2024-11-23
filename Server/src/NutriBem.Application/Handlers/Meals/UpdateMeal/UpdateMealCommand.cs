using System.ComponentModel.DataAnnotations;

namespace NutriBem.Application.Handlers.Meals.UpdateMeal;

public record UpdateMealCommand(
    Ulid AccountRequesterId,
    Ulid MealId,
    string? Name,
    ushort? Order,
    double? FatCountMax,
    double? ProteinCountMax,
    double? CarbohydratesCountMax,
    List<UpdateMealFood>? MealFoods
) : ICommand;


public record UpdateMealRequest(
    Ulid MealId,
    string? Name,
    ushort Order,
    double? FatCountMax,
    double? ProteinCountMax,
    double? CarbohydratesCountMax,
    List<UpdateMealFood>? MealFoods
);

//public Ulid Id { get; set; }
//public Ulid MealId { get; set; }
//public string FoodId { get; set; }
//public string FoodName { get; set; }
//public string ServingId { get; set; }
//public string ServingName { get; set; }
//public int Quantity { get; set; }
//public DateTime RegisteredAt { get; set; }
//public int? ServingCalories { get; set; }
//public double? ServingCarbohydrates { get; set; }
//public double? ServingProteins { get; set; }
//public double? ServingFats { get; set; }

public record UpdateMealFood(
    Ulid Id,
    Ulid MealId,
    string FoodId,
    string FoodName,
    string ServingId,
    string ServingName,
    int Quantity,
    DateTime RegisteredAt,
    int? ServingCalories,
    double? ServingCarbohydrates,
    double? ServingProteins,
    double? ServingFats
);
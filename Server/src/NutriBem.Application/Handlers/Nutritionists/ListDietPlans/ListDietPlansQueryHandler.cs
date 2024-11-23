
using Microsoft.EntityFrameworkCore;

namespace NutriBem.Application.Handlers.Nutritionists.ListDietPlans;

public class ListDietPlansQueryHandler(
    ILogger<ListDietPlansQueryHandler> logger,
    DataContext dbContext
) : IQueryHandler<ListDietPlansQuery, List<DietPlanResponse>>
{
    public async Task<List<DietPlanResponse>> Handle(
        ListDietPlansQuery query, 
        CancellationToken cancellationToken)
    {
        var dietPlans = await dbContext.DietPlans
            .Include(x => x.Meals)
                .ThenInclude(x => x.MealFoods)
            .Where(x => x.PatientId == query.AccountRequesterId)
            .ToListAsync(cancellationToken);

        List<DietPlanResponse> dietPlanResponse = [];

        foreach (var dietPlan in dietPlans)
        {
            dietPlanResponse.Add(new DietPlanResponse(
                dietPlan.Id,
                dietPlan.Name,
                dietPlan.Description,
                dietPlan.AdditionalNote,
                dietPlan.StartDate,
                dietPlan.EndDate,
                dietPlan.Meals.Select(meal => new DietPlanMeal(
                    meal.Id,
                    meal.Name,
                    meal.MealFoods.Sum(x => x.ServingCalories ?? 0),
                    meal.MealFoods.Select(mealFood => new MealFood(
                        mealFood.Id,
                        mealFood.FoodId,
                        mealFood.FoodName,
                        mealFood.ServingId,
                        mealFood.ServingName,
                        mealFood.ServingFats ?? 0,
                        mealFood.ServingCalories ?? 0,
                        mealFood.ServingProteins ?? 0,
                        mealFood.ServingCarbohydrates ?? 0,
                        mealFood.Quantity
                    )).ToList()
                )).ToList()
            ));
        }


        return dietPlanResponse;
    }
}

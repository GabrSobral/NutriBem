using System.Linq;
using System.Xml.Linq;

namespace NutriBem.Application.Handlers.Nutritionists.ListPatients;

public class ListPatientsQueryHandler(
   ILogger<ListPatientsQueryHandler> logger,
   DataContext dbContext
) : IQueryHandler<ListPatientsQuery, List<ListPatientsResponse>>
{
    public async Task<List<ListPatientsResponse>> Handle(ListPatientsQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Listing patients...");

        var nutritionistProfile = await dbContext.NutritionistProfiles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == request.AccountsRequesterId, cancellationToken)
        ?? throw new NutritionistNotFound(request.AccountsRequesterId);

        var patients = await dbContext.LinkAssociations
            .Include(x => x.User)
                .ThenInclude(x => x.UserProfile)
            .Where(p => p.NutritionistId == nutritionistProfile.UserId && p.IsAccepted)
            .ToListAsync(cancellationToken);

        var response = new List<ListPatientsResponse>();

        foreach (var patient in patients)
        {
            var dietPlans = await dbContext.DietPlans
                .Include(x => x.Meals)
                    .ThenInclude(x => x.MealFoods)
                 .Where(x => x.PatientId == patient.UserId)
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

            response.Add(
                new ListPatientsResponse(
                    patient.UserId,
                    patient.User.UserProfile.FirstName,
                    patient.User.UserProfile.LastName,
                    patient.User.UserProfile.Age,
                    patient.User.UserProfile.Height,
                    patient.User.UserProfile.MainObjective,
                    patient.User.UserProfile.Address,
                    patient.User.UserProfile.PhotoUrl,
                    dietPlanResponse
                )
            );
        }

        return response;
    }
}

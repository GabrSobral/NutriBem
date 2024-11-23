namespace NutriBem.Application.Handlers.Meals.GetMealsByDate;

public sealed class GetMealsByDateQueryHandler(
    ILogger<GetMealsByDateQueryHandler> logger,
    DataContext dbContext
) : IQueryHandler<GetMealsByDateQuery, GetMealsByDateQueryResponse>
{
    public async Task<GetMealsByDateQueryResponse> Handle(
        GetMealsByDateQuery query, 
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting meals on date {Date}", query.Date);

        var dateMealsData = await dbContext.Meals
             .Where(x => x.RegisteredAt.Date == query.Date)
             .OrderBy(x => x.Order)
             .Include(x => x.MealFoods)
             .AsNoTracking()
             .ToListAsync(cancellationToken)
        ?? throw new MealNotFoundOnDateException(query.Date);

        var dietPlan = await dbContext.DietPlans
            .AsNoTracking()
            .Include(x => x.Meals)
                .ThenInclude(x => x.MealFoods)
            .Where(x => x.PatientId == query.AccountRequesterId && x.EndDate > DateTime.UtcNow)
            .ToListAsync(cancellationToken);

        var dietPlanMeals = dietPlan
            .SelectMany(x => x.Meals)
            .ToList();

        var response = new GetMealsByDateQueryResponse(query.Date, []);

        if (dietPlanMeals.Count > 0)
        {
            foreach (var item in dietPlanMeals)
            {
                var normalMeal = dateMealsData.FirstOrDefault(x => x.Name == item.Name);

                response.Meals.Add(new MealByDate(
                    item.Id,
                    item.Name,
                    normalMeal?.MealFoods.Select(x => new MealFood(
                        x.Id,
                        x.FoodId,
                        x.FoodName,
                        x.ServingId,
                        x.ServingName,
                        x.ServingFats ?? 0,
                        x.ServingCalories ?? 0,
                        x.ServingProteins ?? 0,
                        x.ServingCarbohydrates ?? 0,
                        x.Quantity
                    ))
                    .ToList() ?? [],
                    item.MealFoods.Select(x => new MealFood(
                        x.Id,
                        x.FoodId,
                        x.FoodName,
                        x.ServingId,
                        x.ServingName,
                        x.ServingFats ?? 0,
                        x.ServingCalories ?? 0,
                        x.ServingProteins ?? 0,
                        x.ServingCarbohydrates ?? 0,
                        x.Quantity
                    )).ToList()
                ));

            }
        } else
        {
            foreach (var item in dateMealsData)
            {
                response.Meals.Add(new MealByDate(
                    item.Id,
                    item.Name,
                    item.MealFoods.Select(x => new MealFood(
                        x.Id,
                        x.FoodId,
                        x.FoodName,
                        x.ServingId,
                        x.ServingName,
                        x.ServingFats ?? 0,
                        x.ServingCalories ?? 0,
                        x.ServingProteins ?? 0,
                        x.ServingCarbohydrates ?? 0,
                        x.Quantity
                    )).ToList(),
                    []
                ));

            }
        }

        

        return response;
    }
}

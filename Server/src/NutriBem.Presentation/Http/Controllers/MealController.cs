using NutriBem.Application.Handlers.Meals.AddMeal;
using NutriBem.Application.Handlers.Meals.AddMealFood;
using NutriBem.Application.Handlers.Meals.DeleteMeal;
using NutriBem.Application.Handlers.Meals.EatFood;
using NutriBem.Application.Handlers.Meals.GetMealsByDate;
using NutriBem.Application.Handlers.Meals.RemoveMealFood;
using NutriBem.Application.Handlers.Meals.UpdateMeal;
using NutriBem.Application.Handlers.Meals.UpdateMealFood;

namespace NutriBem.Presentation.Http.Controllers;

[Authorize]
[ApiController]
[Route("meals")]
public class MealController(ISender sender, IHttpContextAccessor httpContextAccessor) : ControllerBase
{
    [HttpGet("get-by-date/{date}")]
    public async Task<IActionResult> GetMealsByDate([FromRoute] DateOnly date)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var query = new GetMealsByDateQuery(
            AccountRequesterId: userId,
            Date: date.ToDateTime(new TimeOnly()).ToUniversalTime()
        );

        var response = await sender.Send(query);

        if (response == null)
            return NotFound();

        return Ok(response);
    }

    [HttpPost()]
    public async Task<IActionResult> AddMeal([FromBody] AddMealRequest request)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new AddMealCommand(
            AccountRequesterId: userId,
            Name: request.Name,
            Order: request.Order,
            RegisteredAt: request.RegisteredAt
        );

        var response = await sender.Send(command);

        if (response == null)
            return NotFound();

        return Ok(response);
    }

    [HttpDelete("{mealId}")]
    public async Task<IActionResult> DeleteMeal([FromRoute] Ulid mealId)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new DeleteMealCommand(
            AccountRequesterId: userId,
            MealId: mealId
        );

        await sender.Send(command);

        return NoContent();
    }

    [HttpPatch("{mealId}")]
    public async Task<IActionResult> UpdateMeal(
        [FromRoute] Ulid mealId, 
        [FromBody] UpdateMealRequest request)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new UpdateMealCommand(
            AccountRequesterId: userId,
            MealId: mealId,
            Name: request.Name,
            Order: request.Order,
            MealFoods: request.MealFoods,
            FatCountMax: request.FatCountMax,
            CarbohydratesCountMax: request.CarbohydratesCountMax,
            ProteinCountMax: request.ProteinCountMax
        );

        await sender.Send(command);

        return NoContent();
    }

    [HttpPost("food")]
    public async Task<IActionResult> AddMealFood([FromBody] AddMealFoodRequest request)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new AddMealFoodCommand(
            AccountRequesterId: userId,
            MealId: request.MealId,
            FoodId: request.FoodId,
            FoodName: request.FoodName,
            ServingId: request.ServingId,
            ServingName: request.ServingName,
            ServingCarbohydrates: request.ServingCarbohydrates,
            ServingCalories: request.ServingCalories,
            ServingFats: request.ServingFats,
            ServingProteins: request.ServingProteins,
            Quantity: request.Quantity
        );

        var response = await sender.Send(command);

        return Ok(response);
    }

    [HttpDelete("food/{mealFoodId}")]
    public async Task<IActionResult> RemoveMealFood([FromRoute] Ulid mealFoodId)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new RemoveMealFoodCommand(
            AccountRequesterId: userId,
            MealFoodId: mealFoodId
        );

        await sender.Send(command);

        return NoContent();
    }

    [HttpPatch("food/{mealFoodId}")]
    public async Task<IActionResult> UpdateMealFood(
        [FromRoute] Ulid mealFoodId, 
        [FromBody] UpdateMealFoodRequest request)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new UpdateMealFoodCommand(
            AccountRequesterId: userId,
            MealFoodId: mealFoodId,
            FoodId: request.FoodId,
            FoodName: request.FoodName,
            ServingId: request.ServingId,
            ServingName: request.ServingName,
            ServingProteins: request.ServingProteins,
            ServingCalories: request.ServingCalories,
            ServingCarbohydrates: request.ServingCarbohydrates,
            ServingFats: request.ServingFats,
            Quantity: request.Quantity
        );

        var response = await sender.Send(command);

        return Ok(response);
    }

    [HttpPatch("{mealId}/{mealFoodId}")]
    public async Task<IActionResult> EatFood([FromRoute] Ulid mealId, [FromRoute] Ulid mealFoodId)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new EatFoodCommand(
            AccountRequesterId: userId,
            mealId,
            mealFoodId
        );

        await sender.Send(command);

        return NoContent();
    }
}

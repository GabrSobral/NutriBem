using NutriBem.Application.Handlers.Nutritionists.CreateDietPlan;
using NutriBem.Application.Handlers.Nutritionists.ListDietPlans;
using NutriBem.Application.Handlers.Nutritionists.RemoveDietPlan;
using NutriBem.Application.Handlers.Nutritionists.UpdateDietPlan;
namespace NutriBem.Presentation.Http.Controllers;

[Authorize]
[ApiController]
[Route("diet-plan")]
public class DietPlanController(ISender sender, IHttpContextAccessor httpContextAccessor) : ControllerBase
{
    [HttpPost("{patientId}")]
    public async Task<IActionResult> CreateDietPlan(
        [FromRoute] string patientId,
        [FromBody] CreateDietPlanRequest request)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new CreateDietPlanCommand(
            AccountRequesterId: userId,
            PatientId: Ulid.Parse(patientId),
            Name: request.Name,
            Description: request.Description,
            AdditionalNote: request.AdditionalNotes,
            StartDate: request.StartDate,
            EndDate: request.EndDate,
            Meals: request.Meals
        );

        var response = await sender.Send(command);

        return Ok(response);
    }

    [HttpPut("{patientId}/{dietPlanId}")]
    public async Task<IActionResult> UpdateDietPlan(
        [FromRoute] string patientId,
        [FromRoute] string dietPlanId,
        [FromBody] UpdateDietPlanRequest request)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new UpdateDietPlanCommand(
            AccountRequesterId: userId,
            DietPlanId: Ulid.Parse(dietPlanId),
            PatientId: Ulid.Parse(patientId),
            Name: request.Name,
            Description: request.Description,
            AdditionalNote: request.AdditionalNotes,
            StartDate: request.StartDate,
            EndDate: request.EndDate,
            Meals: request.Meals
        );

        var response = await sender.Send(command);

        return Ok(response);
    }

    [HttpDelete("{dietPlanId}")]
    public async Task<IActionResult> RemoveDietPlan([FromRoute] string dietPlanId)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new RemoveDietPlanCommand(
            AccountRequesterId: userId,
            DietPlanId: Ulid.Parse(dietPlanId)
        );

        await sender.Send(command);

        return NoContent();
    }

    [HttpGet("my")]
    public async Task<IActionResult> ListDietPlans()
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);
        var query = new ListDietPlansQuery(AccountRequesterId: userId);
        var response = await sender.Send(query);

        return Ok(response);
    }
}
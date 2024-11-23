using NutriBem.Application.Handlers.Nutritionists.Associate;
using NutriBem.Application.Handlers.Nutritionists.Disassociate;
using NutriBem.Application.Handlers.Nutritionists.GetUserNutritionist;
using NutriBem.Application.Handlers.Nutritionists.ListPatients;

namespace NutriBem.Presentation.Http.Controllers;

[Authorize]
[ApiController]
[Route("nutritionist")]
public class NutritionistController(ISender sender, IHttpContextAccessor httpContextAccessor) : ControllerBase
{
    [HttpPost("associate/{nutritionistId}")]
    public async Task<IActionResult> Associate([FromRoute] Ulid nutritionistId)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext); 
        
        var command = new AssociateCommand(userId, nutritionistId);
        var response = await sender.Send(command);

        return Ok(response);
    }

    [HttpDelete("disassociate/{nutritionistId}")]
    public async Task<IActionResult> Disassociate([FromRoute] Ulid nutritionistId)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new DisassociateCommand(userId, nutritionistId);
        await sender.Send(command);

        return NoContent();
    }

    [HttpGet("patients")]
    public async Task<IActionResult> ListPatients()
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new ListPatientsQuery(userId);
        var response = await sender.Send(command);

        return Ok(response);
    }

    [HttpGet("my")]
    public async Task<IActionResult> GetUserNutritionist()
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var query = new GetUserNutritionistQuery(userId);
        var response = await sender.Send(query);

        return Ok(response);
    }
}

using NutriBem.Application.Handlers.Nutritionists.Commands.ChangePassword;
using NutriBem.Application.Handlers.Nutritionists.Queries.GetByCrn;
using NutriBem.Application.Handlers.Nutritionists.Queries.GetById;

namespace NutriBem.Presentation.Http.Controllers;

[Authorize]
[ApiController]
[Route("nutritionists")]
public class NutritionistController(ISender sender) : ControllerBase
{
    /// <summary>
    /// Search an nutritionist by Id.
    /// </summary>
    /// <param name="nutritionistId">Nutritionist Id</param>
    /// <response code="200">Returns the nutritionist searched</response>
    /// <response code="400">If the "Id" is null</response>
    /// <response code="404">If the nutritionist was not found</response>
    /// <response code="500">Internal server error</response>
    /// <returns></returns>
    [HttpGet("get-by-id/{nutritionistId}", Name = nameof(GetNutritionistById))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetNutritionistByIdResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetNutritionistById([FromRoute] Ulid nutritionistId)
    {
        var query = new GetNutritionistByIdQuery (nutritionistId);
        var response = await sender.Send(query);

        if(response == null) 
            return NotFound();

        return Ok(response);
    }

    /// <summary>
    /// Search an nutritionist by CRN document.
    /// </summary>
    /// <param name="crn">CRN document</param>
    /// <response code="200">Returns the nutritionist searched</response>
    /// <response code="400">If the "CRN" is null</response>
    /// <response code="404">If the nutritionist was not found</response>
    /// <response code="500">Internal server error</response>
    /// <returns></returns>
    [HttpGet("get-by-crn/{crn}", Name = nameof(GetNutritionistByCRN))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetByCRNResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetNutritionistByCRN([FromRoute] string crn)
    {
        var query = new GetByCRNQuery(crn);
        var response = await sender.Send(query);

        if(response == null) 
            return NotFound();

        return Ok(response);
    }

    /// <summary>
    /// Change nutritionist password.
    /// </summary>
    /// <param name="request">Request</param>
    /// <response code="204"></response>
    /// <response code="400">If the body is invalid</response>
    /// <response code="404">If the nutritionist was not found</response>
    /// <response code="500">Internal server error</response>
    /// <returns></returns>
    [HttpPatch("change-password", Name = nameof(ChangePassword))]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ChangePassword([FromBody] ChangeNutritionistPasswordRequest request)
    {
        var command = new ChangeNutritionistPasswordCommand(request.NutritionistId, request.CurrentPassword, request.NewPassword);
        await sender.Send(command);

        return NoContent();
    }
}
using NutriBem.Application.Handlers.FoodTracking;

namespace NutriBem.Presentation.Http.Controllers;

[Authorize]
[ApiController]
[Route("food-tracking")]
public class FoodTrackingController(ISender sender, IHttpContextAccessor httpContextAccessor) : ControllerBase
{
    /// <summary>
    /// Create a food tracking for the user in a certain day
    /// </summary>
    /// <param name="command">CreateFoodTrackingCommand</param>
    /// <response code="201">Returns the food tracking created</response>
    /// <response code="400">If the "Id" is null</response>
    /// <response code="500">Internal server error</response>
    /// <returns></returns>
    [HttpPost("register", Name = nameof(CreateFoodTracking))]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CreateFoodTrackingResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateFoodTracking([FromBody] CreateFoodTrackingCommand command)
    {
        var response = await sender.Send(command);

        return CreatedAtRoute(nameof(GetFoodTrackingByUserId), new { userId = response.UserId, date = response.RegisteredAt }, response);
    }

    /// <summary>
    ///  Gets the food tracking of the user in a certain day
    /// </summary>
    /// <param name="userId">User Id</param>
    /// <param name="date">Date</param>
    /// <response code="200">Returns the food tracking of the user in a certain day</response>
    /// <response code="400">If the "Id" is null</response>
    /// <response code="404">If the food tracking was not found</response>
    /// <response code="500">Internal server error</response>
    [HttpGet("{userId}/{date}", Name = nameof(GetFoodTrackingByUserId))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetFoodTrackingByUserIdResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetFoodTrackingByUserId([FromRoute] Ulid userId, [FromRoute] DateTime date)
    {
        var query = new GetFoodTrackingByUserIdQuery(userId, date);
        var response = await sender.Send(query);

        if(response == null) 
            return NotFound();

        return Ok(response);
    }

    /// <summary>
    /// Update the food tracking for the user in a certain day
    /// </summary>
    /// <param name="command">UpdateFoodTrackingCommand</param>
    /// <response code="200">Returns the updated food tracking</response>
    /// <response code="400">If the "Id" is null</response>
    /// <response code="404">If the food tracking was not found</response>
    /// <response code="500">Internal server error</response>
    [HttpPut("update", Name = nameof(UpdateFoodTracking))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UpdateFoodTrackingResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateFoodTracking([FromBody] UpdateFoodTrackingCommand command)
    {
       var response = await sender.Send(command);

       if (response == null)
           return NotFound();

       return Ok(response);
    }

    /// <summary>
    /// Get the food portion by Id
    /// </summary>
    /// <param name="foodPortionId">Food Portion Id</param>
    /// <response code="200">Returns the food portion</response>
    /// <response code="400">If the "Id" is null</response>
    /// <response code="404">If the food portion was not found</response>
    /// <response code="500">Internal server error</response>
    [HttpGet("food-portion/{foodPortionId}", Name = nameof(GetFoodPortionById))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetFoodPortionResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetFoodPortionById([FromRoute] int foodPortionId)
    {
        var query = new GetFoodPortionQuery(foodPortionId);
        var response = await sender.Send(query);

        if(response == null) 
            return NotFound();

        return Ok(response);
    }

    /// <summary>
    /// Register a food portion in the food tracking
    /// </summary>
    /// <param name="command">RegisterFoodPortionCommand</param>
    /// <response code="201">Returns the food portion registered</response>
    /// <response code="400">If the "Id" is null</response>
    /// <response code="500">Internal server error</response>
    /// <returns></returns>
    [HttpPost("register/food-portion", Name = nameof(RegisterFoodPortion))]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(RegisterFoodPortionResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> RegisterFoodPortion([FromBody] RegisterFoodPortionCommand command)
    {
        var response = await sender.Send(command);

        return CreatedAtRoute(nameof(GetFoodPortionById), new { foodPortionId = response.Id }, response);
    }

}

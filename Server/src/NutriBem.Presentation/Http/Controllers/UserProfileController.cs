namespace NutriBem.Presentation.Http.Controllers;

[Authorize]
[ApiController]
[Route("profile")]
public class UserProfileController() : ControllerBase
{
    /// <summary>
    /// Update the user profile by Id.
    /// </summary>
    /// <param name="userId">User Id</param>
    /// <param name="request">Request body</param>
    /// <response code="204"></response>
    /// <response code="400">If the body is invalid</response>
    /// <response code="404">If the user was not found</response>
    /// <response code="500">Internal server error</response>
    /// <returns></returns>
    [HttpPut("{userId}", Name = nameof(UpdateUserProfile))]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateUserProfile(
        [FromRoute] Ulid userId, 
        [FromBody] UpdateUserProfileRequest request)
    {
        var command = new UpdateUserProfileCommand(
            UserId: userId,
            FirstName: request.FirstName,
            LastName: request.LastName,
            Email: request.Email,
            BirthDate: request.BirthDate,
        );

        await sender.Send(command);

        return NoContent();
    }
}
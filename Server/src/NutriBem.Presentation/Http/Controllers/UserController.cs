using NutriBem.Application.Handlers.Users.Queries.GetByProviderId;
using NutriBem.Domain.Entities;

namespace NutriBem.Presentation;

[Authorize]
[ApiController]
[Route("users")]
public class UserController(ISender sender, IHttpContextAccessor httpContextAccessor) : ControllerBase
{
    /// <summary>
    /// Search an user by Id.
    /// </summary>
    /// <param name="userId">User Id</param>
    /// <response code="200">Returns the user searched</response>
    /// <response code="400">If the "Id" is null</response>
    /// <response code="404">If the user was not found</response>
    /// <response code="500">Internal server error</response>
    [HttpGet("get-by-id/{userId}", Name = nameof(GetUserById))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetByIdResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUserById([FromRoute] Ulid userId)
    {
        var query = new GetByIdQuery(userId);
        var response = await sender.Send(query);

        if(response == null) 
            return NotFound();

        return Ok(response);
    }

    /// <summary>
    /// Search an user by provider user ID.
    /// </summary>
    /// <param name="provider">Provider Enum</param>
    /// <param name="providerKey">Provider key from user</param>
    /// <response code="200">Returns the user searched</response>
    /// <response code="400">If the "Id" is null</response>
    /// <response code="404">If the user was not found</response>
    /// <response code="500">Internal server error</response>
    [AllowAnonymous]
    [HttpGet("get-by-id/provider/{provider}/{providerKey}", Name = nameof(GetUserByProviderKey))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetByProviderIdResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUserByProviderKey([FromRoute] EAuthProviders provider, [FromRoute] string providerKey)
    {
        var query = new GetByProviderIdQuery(provider, providerKey);
        var response = await sender.Send(query);

        if (response == null)
            return NotFound();

        return Ok(response);
    }

    /// <summary>
    /// Search an user by e-mail.
    /// </summary>
    /// <param name="email">User email</param>
    /// <response code="200">Returns the user searched</response>
    /// <response code="400">If the "email" is null</response>
    /// <response code="404">If the user was not found</response>
    /// <response code="500">Internal server error</response>
    [HttpGet("get-by-email/{email}", Name = nameof(GetUserByEmail))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetByEmailResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUserByEmail(string email)
    {
        var query = new GetByEmailQuery(email);
        var response = await sender.Send(query);

        if(response == null) 
            return NotFound();

        return Ok(response);
    }

    /// <summary>
    /// Update an user by Id.
    /// </summary>
    /// <param name="userId">User Id</param>
    /// <param name="request">Request body</param>
    /// <response code="204"></response>
    /// <response code="400">If the body is invalid</response>
    /// <response code="404">If the user was not found</response>
    /// <response code="500">Internal server error</response>
    [HttpPut("{userId}", Name = nameof(UpdateUserData))]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateUserData(
        [FromRoute] Ulid userId, 
        [FromBody] UpdateUserDataRequest request)
    {
        var command = new UpdateUserDataCommand(
            UserId: userId,
            FirstName: request.FirstName,
            LastName: request.LastName);

        await sender.Send(command);

        return NoContent();
    }

    /// <summary>
    /// Change user password.
    /// </summary>
    /// <param name="request">Request body</param>
    /// <response code="204"></response>
    /// <response code="400">If the body is invalid</response>
    /// <response code="404">If the user was not found</response>
    /// <response code="403">If the user provides the current password which is invalid</response>
    /// <response code="500">Internal server error</response>
    [HttpPatch("change-password", Name = nameof(ChangeUserPassword))]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ChangeUserPassword(
        [FromBody] ChangePasswordRequest request)
    {
        var userId = HttpUserClaims.GetId(httpContextAccessor?.HttpContext);

        var command = new ChangePasswordCommand(
            UserId: userId,
            CurrentPassword: request.CurrentPassword,
            NewPassword: request.NewPassword);

        await sender.Send(command);

        return NoContent();
    }
}

global using System.Reflection;
global using System.Security.Claims;

global using MediatR;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Http;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.Extensions.DependencyInjection;

global using NutriBem.Domain.Exceptions;

global using NutriBem.Application.Handlers.Authentication.SignIn;
global using NutriBem.Application.Handlers.Authentication.SignUp;
global using NutriBem.Application.Handlers.Users.Queries.GetById;
global using NutriBem.Application.Handlers.Users.Queries.GetByEmail;
global using NutriBem.Application.Handlers.Users.Commands.UpdateUserData;
global using NutriBem.Application.Handlers.Users.Commands.ChangePassword;
global using NutriBem.Application.Handlers.Authentication.RevokeAccessToken;

global using NutriBem.Application.Handlers.Authentication.ConfirmEmail;
global using NutriBem.Application.Handlers.Authentication.ForgotPassword;
global using NutriBem.Application.Handlers.Authentication.ForgotPasswordSendMail;

global using NutriBem.Presentation.Http.Utils;
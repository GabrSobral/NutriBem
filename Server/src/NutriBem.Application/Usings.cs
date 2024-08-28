global using MediatR;
global using FluentValidation;
global using System.Reflection;
global using Microsoft.Extensions.Options;
global using Microsoft.Extensions.Logging;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.IdentityModel.Tokens;
global using Konscious.Security.Cryptography;
global using Microsoft.Extensions.DependencyInjection;


global using NutriBem.Domain.Entities;
global using NutriBem.Domain.Exceptions;
global using NutriBem.Domain.Interfaces;
global using NutriBem.Domain.Interfaces.Authentication;

global using NutriBem.Application.Core;
global using NutriBem.Application.Core.Exceptions;
global using NutriBem.Application.Core.Behaviours;
global using NutriBem.Application.Core.Behaviours.Messaging;
global using NutriBem.Application.Handlers.Authentication.SignIn;

global using NutriBem.Infra.Database.Contexts;

global using System.Text;
global using System.IdentityModel.Tokens.Jwt;
global using System.Security.Claims;
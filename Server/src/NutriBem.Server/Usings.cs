
#region Packages
global using Asp.Versioning;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.OpenApi.Models;
global using Microsoft.Extensions.Options;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.IdentityModel.Tokens;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
#endregion

#region System
global using System.Net;
global using System.Text;
global using System.Text.Json;
#endregion

#region Server
global using NutriBem.Server.Middlewares;
global using NutriBem.Server.Configuration;
global using NutriBem.Server.OptionsSetup;
#endregion

#region Domain
global using NutriBem.Domain.Exceptions;
#endregion

#region Application
global using NutriBem.Application;
global using NutriBem.Application.Core;
global using NutriBem.Application.Core.Exceptions;
#endregion

#region Infraestruture Data
global using NutriBem.Infra.Database;
global using NutriBem.Infra.Database.Contexts;

#endregion

#region Presentation
global using NutriBem.Presentation;
#endregion

global using NutriBem.Infra.Email;
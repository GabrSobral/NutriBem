FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5001

ENV ASPNETCORE_URLS=http://+:5000

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release

WORKDIR /src

COPY ["NutriBem.Server/NutriBem.Server.csproj", "NutriBem.Server/"]
COPY ["NutriBem.Domain/NutriBem.Domain.csproj", "NutriBem.Domain/"]
COPY ["NutriBem.Application/NutriBem.Application.csproj", "NutriBem.Application/"]
COPY ["NutriBem.Presentation/NutriBem.Presentation.csproj", "NutriBem.Presentation/"]
COPY ["NutriBem.Infra.Database/NutriBem.Infra.Database.csproj", "NutriBem.Infra.Database/"]

RUN dotnet restore "NutriBem.Server/NutriBem.Server.csproj"
COPY . . 
WORKDIR "/src/NutriBem.Server"
RUN dotnet build "NutriBem.Server.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "NutriBem.Server.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NutriBem.Server.dll"]
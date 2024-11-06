namespace NutriBem.Application.Handlers.Nutritionists.Queries.GetByCrn;

public class GetByEmailQueryHandler(
    ILogger<GetByEmailQueryHandler> logger,
    DataContext dbContext
) : IQueryHandler<GetByCRNQuery, GetByCRNResponse>
{
    public async Task<GetByCRNResponse> Handle(GetByCRNQuery query, CancellationToken cancellationToken)
    {
        var CRN = query.CRN.ToLower();

        logger.LogInformation($"Searching for nutritionist CRN: {CRN}");

        var nutritionist = await dbContext.Nutritionists
            .AsNoTracking()
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Document == CRN, cancellationToken)
            ?? throw new UserNotFoundException(CRN);

        return new GetByCRNResponse(nutritionist);
    }
}
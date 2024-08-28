namespace NutriBem.Application.Core.Behaviours.Messaging;

public interface IQueryHandler<IQuery, TResponse> : IRequestHandler<IQuery, TResponse>
    where IQuery : IQuery<TResponse>
{ }

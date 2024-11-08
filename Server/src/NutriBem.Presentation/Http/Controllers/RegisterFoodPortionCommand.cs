﻿using NutriBem.Application.Core.Behaviours.Messaging;
using NutriBem.Application.Handlers.FoodPortion;

namespace NutriBem.Application.Handlers.FoodTracking;
public record RegisterFoodPortionCommand(
    int Id,
    int FoodId,
    string Modifier,
    double GramWeight,
    int SequenceNumber,
    string PortionDescription,
    int MeasureUnitId,
    int MinYearAcquired,
    double Amount,
    double Value
) : ICommand<RegisterFoodPortionResponse>;

namespace NutriBem.Domain.Entities;

[Table("food_portion")]
public class FoodPortion
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [ForeignKey("food_id")]
    public int FoodId { get; set; }

    [Column("modifier")]
    public string? Modifier { get; set; }

    [Column("gram_weight")]
    public double GramWeight { get; set; }

    [Column("sequence_number")]
    public int SequenceNumber { get; set; }

    [Column("portion_description")]
    public string? PortionDescription { get; set; }

    [Column("measure_unit_id")]
    public int MeasureUnitId { get; set; }

    [Column("min_year_acquired")]
    public int MinYearAcquired { get; set; }

    [Column("amount")]
    public double Amount { get; set; }

    [Column("value")]
    public double Value { get; set; }

    public static FoodPortion Create(int foodId, string modifier, double gramWeight, int sequenceNumber, string portionDescription, int measureUnitId, int minYearAcquired, double amount, double value)
    {
        return new FoodPortion()
        {
            FoodId = foodId,
            Modifier = modifier,
            GramWeight = gramWeight,
            SequenceNumber = sequenceNumber,
            PortionDescription = portionDescription,
            MeasureUnitId = measureUnitId,
            MinYearAcquired = minYearAcquired,
            Amount = amount,
            Value = value
        };
    }
}

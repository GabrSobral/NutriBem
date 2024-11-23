namespace NutriBem.Domain.Entities;

[Table("diet_plan")]
public class DietPlan
{
    [Key]
    public Ulid Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public string AdditionalNote { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public Ulid CreatedBy { get; set; }
    public Ulid PatientId { get; set; }


    #region Foreign Keys

    [ForeignKey(nameof(CreatedBy))]
    public NutritionistProfile Nutritionist { get; set; }

    [ForeignKey(nameof(PatientId))]
    public User Patient { get; set; }

    public IEnumerable<Meal> Meals { get; set; }

    #endregion
}

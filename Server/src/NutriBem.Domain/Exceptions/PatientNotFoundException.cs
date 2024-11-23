namespace NutriBem.Domain.Exceptions;

public class PatientNotFoundException: Exception
{
    public PatientNotFoundException(Ulid patientId)
        : base($"Patient with id {patientId} was not found.")
    {
    }
}

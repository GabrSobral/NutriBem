namespace NutriBem.Domain.Exceptions;

public class CurrentPasswordNotMatchWithStoredException(Ulid userId)
    : Exception($"The current password does not match with the stored password: {userId}");

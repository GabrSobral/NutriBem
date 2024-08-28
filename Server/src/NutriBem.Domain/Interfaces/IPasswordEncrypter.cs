namespace NutriBem.Domain.Interfaces.Authentication;

public interface IPasswordEncrypter
{
    public string Encrypt<T>(string rawPassword, T? userId);
    public bool Compare<T>(string storedPassword, string enteredPassword, T? userId);
}

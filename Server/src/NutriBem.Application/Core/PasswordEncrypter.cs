namespace NutriBem.Application.Core;

/// <summary>
/// A Argon 2 password encrypter implementation.
/// </summary>
public class PasswordEncrypter : IPasswordEncrypter
{
    private readonly byte[] _salt = new byte[32];
    private readonly int _iterations = 4;
    private readonly int _memorySize = 8192;

    /// <summary>
    /// Encrypt a raw password to a hashed password, using Argon2i algorithm
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="rawPassword">The raw password passed to be encrypted</param>
    /// <param name="userId">The Id user of password owner</param>
    /// <returns>A hash password converted to a base64 string</returns>
    public string Encrypt<T>(string rawPassword, T? userId)
    {
        byte[] password = Encoding.UTF8.GetBytes(rawPassword);
        byte[] userUuidBytes = Encoding.UTF8.GetBytes(userId == null ? "" : userId.ToString()!);

        using var argon2 = new Argon2i(password);

        argon2.DegreeOfParallelism = 32; // Threads number of server
        argon2.MemorySize = _memorySize;
        argon2.Iterations = _iterations;
        argon2.Salt = _salt;
        argon2.AssociatedData = userUuidBytes;

        byte[] encryptedPassword = argon2.GetBytes(64);

        return Convert.ToBase64String(encryptedPassword);
    }

    /// <summary>
    /// Compare the stored password with an entered password.
    /// </summary>
    /// <typeparam name="T">Generic to type the user Id</typeparam>
    /// <param name="storedPassword">A previous encrypted password</param>
    /// <param name="enteredPassword">A raw password that you want to compare with a hash</param>
    /// <param name="userId">Password owner user Id</param>
    /// <returns>A boolean showing if the entered password match with the stored password</returns>
    public bool Compare<T>(string storedPassword, string enteredPassword, T? userId)
    {
        var encryptedPassword = Encrypt(enteredPassword, userId);

        return encryptedPassword == storedPassword;
    }
}

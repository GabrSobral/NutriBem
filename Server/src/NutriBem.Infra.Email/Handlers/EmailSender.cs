using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace NutriBem.Infra.Email.Handlers;

public class EmailSender : IEmailSender
{
    private readonly string mail;
    private readonly string password;

    private readonly SmtpClient client;

    public EmailSender(IConfiguration configuration)
    {
        mail = configuration.GetSection("MailProvider:Email").Value ?? string.Empty;
        password = configuration.GetSection("MailProvider:Password").Value ?? string.Empty;

        client = new SmtpClient("smtp-mail.outlook.com", 587)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(mail, password)
        };
    }

    public async Task SendPasswordResetEmailAsync(string email, PasswordResetToken passwordResetToken, CancellationToken cancellationToken)
    {
        await client.SendMailAsync(new MailMessage(
            from: mail,
            to: email,
            subject: "NutriBem - Reset Password",
            body: $"""
                 Hi, {passwordResetToken.UserId}, here is your password reset link:

                 http://localhost:5173/auth/reset-password?token={passwordResetToken.Token}&id={passwordResetToken.Id}
             """
        ), cancellationToken);
    }

    public async Task SendVerificationEmailAsync(string email, EmailConfirmation emailConfirmation, CancellationToken cancellationToken)
    {
        await client.SendMailAsync(new MailMessage(
            from: mail,
            to: email,
            subject: "NutriBem  - E-mail confirmation",
            body: $"""
                 Hi, {emailConfirmation.UserId}, here is your e-mail confirmation link:

                 http://localhost:5173/auth/confirmation/email?token={emailConfirmation.Token}
             """
        ), cancellationToken);
    }
}

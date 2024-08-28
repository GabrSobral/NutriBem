namespace NutriBem.Application.Handlers.Authentication.ForgotPasswordSendMail;

public record ForgotPasswordSendMailCommand(    
    string Email
): ICommand;

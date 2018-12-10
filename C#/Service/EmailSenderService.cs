using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data.Providers;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Configuration;
using Sabio.Models.Requests;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Reflection;
using System.IO;
using System.Web;

namespace Sabio.Services
{
    public class EmailSenderService
    {

        public static void SendEmail(AppUserCreateRequest req)
        {

            Execute(req.FirstName, req.RegisterToken, req.Email).Wait();
        }

        static string LoadTemplate(string name)
        {
            using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("Sabio.Services." + name))
            using (var sr = new StreamReader(stream))
                return sr.ReadToEnd();
        }

        static async Task Execute(string firstName, string registerToken, string email)
        {

            var apiKey = ConfigurationManager.AppSettings["SENDGRID_API_KEY"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("C62Test@sabio.la", "Grolo Team");
            var to = new EmailAddress(email);
            var domainUrl = ConfigurationManager.AppSettings["SiteUrlOrigin"];
            var subject = "Grolo Registration Confirmation";

            string template = LoadTemplate("EmailTemplate.html");
            template = template.Replace("$$FIRSTNAME$$", HttpUtility.HtmlEncode(firstName));
            template = template.Replace("$$REGISTERTOKEN$$", HttpUtility.HtmlEncode(registerToken));
            template = template.Replace("$$DOMAINURL$$", HttpUtility.HtmlEncode(domainUrl));
            var plainTextcontent = template;
            var htmlContent = template;

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextcontent, htmlContent);

            Response response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            //bool success = response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == HttpStatusCode.OK;
            //return success;
        }

        public static async Task SendForgotPasswordEmail(string firstName, string registerToken, string email)
        {

            var apiKey = ConfigurationManager.AppSettings["SENDGRID_API_KEY"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("C62Test@sabio.la", "Grolo Team");
            var to = new EmailAddress(email);
            var domainUrl = ConfigurationManager.AppSettings["SiteUrlOrigin"];
            var subject = "Reset Grolo Password";

            string template = LoadTemplate("ForgotPasswordTemplate.html");
            template = template.Replace("$$FIRSTNAME$$", HttpUtility.HtmlEncode(firstName));
            template = template.Replace("$$REGISTERTOKEN$$", HttpUtility.HtmlEncode(registerToken.ToString()));
            template = template.Replace("$$DOMAINURL$$", HttpUtility.HtmlEncode(domainUrl));
            var plainTextcontent = template;
            var htmlContent = template;

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextcontent, htmlContent);

            Response response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            //bool success = response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == HttpStatusCode.OK;
            //return success;

        }

        public static async Task SendNewPasswordEmailConfirmation(string firstName, string email)
        {

            var apiKey = ConfigurationManager.AppSettings["SENDGRID_API_KEY"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("C62Test@sabio.la", "Grolo Team");
            var to = new EmailAddress(email);
            var domainUrl = ConfigurationManager.AppSettings["SiteUrlOrigin"];
            var subject = "Your Password Has Been Changed";

            string template = LoadTemplate("PasswordResetTemplate.html");
            template = template.Replace("$$FIRSTNAME$$", HttpUtility.HtmlEncode(firstName));
            template = template.Replace("$$DOMAINURL$$", HttpUtility.HtmlEncode(domainUrl));

            var plainTextcontent = template;
            var htmlContent = template;

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextcontent, htmlContent);

            Response response = await client.SendEmailAsync(msg).ConfigureAwait(false);

            //bool success = response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == HttpStatusCode.OK;
            //return success;

        }


        public static async Task SendTenantInviteEmail(int tenantId, string role, string email)
        {
            var subject = "Grolo Registration Confirmation";
            var apiKey = ConfigurationManager.AppSettings["SENDGRID_API_KEY"];
            var domainUrl = ConfigurationManager.AppSettings["SiteUrlOrigin"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("C63Test@sabio.la", "Grolo Team");
            var to = new EmailAddress(email);
            

            string template = LoadTemplate("EmailTenantTemplate.html");
            template = template.Replace("$$TENANTID$$", HttpUtility.HtmlEncode(tenantId));
            template = template.Replace("$$ROLEID$$", HttpUtility.HtmlEncode(role));
            template = template.Replace("$$DOMAINURL$$", HttpUtility.HtmlEncode(domainUrl));
            var msg = MailHelper.CreateSingleEmail(from, to, subject, template, template);

            Response response = await client.SendEmailAsync(msg).ConfigureAwait(false);

        }
    }
}



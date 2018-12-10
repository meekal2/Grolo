using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using Sabio.Services.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers
{
    [RoutePrefix("api/appuser")]
    public class AppUserController : ApiController
    {
        readonly AppUserService appUserService;
        readonly IAuthenticationService authService;

        public AppUserController(AppUserService appUserService, IAuthenticationService authService)
        {
            this.appUserService = appUserService;
            this.authService = authService;
        }

        [HttpGet, Route("{pageIndex:int}/{pageSize:int}")]
        public HttpResponseMessage GetAllUserRoles(int pageIndex, int pageSize)
        {
            PagedResponse<AppUserRole> pagedResponse = appUserService.GetAllUserRoles(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedResponse<AppUserRole>>
            {
                Item = pagedResponse
            });
        }
        [HttpGet, Route("search/{pageIndex:int}/{pageSize:int}")]
        public HttpResponseMessage GetAllUserRolesSearch(int pageIndex, int pageSize, string q)
        {
            PagedResponse<AppUserRole> pagedResponse = appUserService.GetAllUserRolesSearch(pageIndex, pageSize, q);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedResponse<AppUserRole>>
            {
                Item = pagedResponse
            });
        }
        [HttpPost, Route("register")]
        public HttpResponseMessage Create(AppUserCreateRequest appUserCreateRequest)
        {
            if (appUserCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            EmailSenderService.SendEmail(appUserCreateRequest);
            int newAppUserId = appUserService.Create(appUserCreateRequest);


            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newAppUserId });
        }
        [HttpPost, Route("userlist")]
        public HttpResponseMessage CreateUserRole(AppUserRoleAddRequest appUserRoleAddRequest)
        {
            if (appUserRoleAddRequest == null)
            {
                ModelState.AddModelError("", "missing information");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            appUserService.CreateUserRole(appUserRoleAddRequest);
            return Request.CreateResponse(HttpStatusCode.Created, new SuccessResponse());
        }
        [HttpPut, Route("{id:int}")]
        public HttpResponseMessage Update(int id, AppUserUpdateRequest appUserUpdateRequest)
        {
            if (appUserUpdateRequest == null)
            {
                ModelState.AddModelError("", "No Body Data.");
            }
            else if (id != appUserUpdateRequest.Id)
            {
                ModelState.AddModelError("id", "ID in the URL doesn't match with the ID in the body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }

            appUserService.Update(appUserUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [HttpGet, Route("{id:int}")]
        public HttpResponseMessage SelectById(int id)
        {
            AppUser appUser = appUserService.SelectById(id);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<AppUser>
            {
                Item = appUser
            });
        }

        [HttpGet, Route("current")]
        public HttpResponseMessage GetCurrent()
        {
            int? id = User.Identity.GetId();

            AppUser user = id.HasValue ? appUserService.SelectById(id.Value) : null;

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<AppUser>
            {
                Item = user
            });
        }

        [HttpDelete, Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            appUserService.Delete(id);

            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [HttpPut, Route("registerConfirm")]
        public HttpResponseMessage RegisterConfirm(string Token)
        {
            appUserService.RegisterConfirm(Token);

            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }
        [HttpPost, Route("confirm")]
        public HttpResponseMessage Confirm(AppUserConfirmRequest appUserConfirmRequest)

        {
            Confirm confirm = appUserService.Confirm(appUserConfirmRequest);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Confirm>
            {
                Item = confirm
            });
        }
        


        [HttpPost, Route("logout")]
        public HttpResponseMessage Logout()
        {

            authService.LogOut();
            return Request.CreateResponse(HttpStatusCode.OK);
        }




        [HttpPost, Route("login")]
        public HttpResponseMessage Login(AppUserLoginRequest appUserLoginRequest)
        {
            LoginResult result = appUserService.Login(appUserLoginRequest);
            if (result != null && result.Id.HasValue)
            {
                // log in success

                // this sets the cookie
                authService.LogIn(new UserBase
                {
                   // userId = User.Identity.GetId().Value;

                    Id = result.Id.Value,
                    TenantId = result.TenantId.Value,
                    Name = "",
                    Roles = new string[0]
                });

                return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<LoginResult>
                {
                    Item = result
                });
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorResponse("Invalid username or password"));
            }


        }
        //[HttpPost, Route("register/test")]
        //public HttpResponseMessage SendEmail()
        //{
        //    EmailSenderService.SendEmail();
        //    return Request.CreateResponse(HttpStatusCode.OK);
        //}

        [HttpPost, Route("forgotPassword")]

        public HttpResponseMessage ForgotPassword(AppUserForgotPasswordRequest forgotPasswordRequest)
        {

            //where are we checking if it is null or valid?
            if (forgotPasswordRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }


            bool success = appUserService.ForgotPassword(forgotPasswordRequest);

            if (success)
                return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorResponse("Unable to find that email address."));

        }
       
        [HttpGet, Route("tester")]
        public HttpResponseMessage Test()
        {
            User.Identity.GetTenantId();
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }
        [HttpPost, Route("invite")]
        public async Task<HttpResponseMessage> Invite(TenantInviteCreateRequest tenantInviteCreateRequest)
        {
            if (tenantInviteCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int tenantId = User.Identity.GetTenantId().Value;

            await EmailSenderService.SendTenantInviteEmail(tenantId,tenantInviteCreateRequest.Role,tenantInviteCreateRequest.Email);


            return Request.CreateResponse(HttpStatusCode.Created, new SuccessResponse());
        }


        [HttpPost, Route("newPassword")]
        public HttpResponseMessage ResetNewPassword(AppUserResetNewPasswordRequest newPasswordRequest)
        {
            if (newPasswordRequest == null)
            {
                ModelState.AddModelError("", "missing body data");

            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            //returning a bool. service.nameofmethod(requestmodel)
            bool success = appUserService.ResetNewPassword(newPasswordRequest);

            if (success)
                return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorResponse("There has been an issuse with your password"));


            //make response objects, like if password if 
        }


        [HttpPost, Route("passwordConfirmation")]

        public HttpResponseMessage ConfirmPasswordToken(AppUserConfirmPassRequest confirmPassRequest)
        {
            //this needs to call service that goes to data base that make sure the restToken is valid gets the 
            if (confirmPassRequest == null)
            {
                ModelState.AddModelError("", " Your reset password has been expired");
            }
            if (!ModelState.IsValid)

            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }


            int userId = appUserService.ConfirmPasswordToken(confirmPassRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = userId });
        }


    }
}
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data;

namespace Sabio.Services
{
    using BCrypt.Net;
    using Newtonsoft.Json.Linq;

    public class AppUserService
    {
        readonly IDataProvider dataProvider;

        public AppUserService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedResponse<AppUser> GetAll(int pageIndex, int pageSize)
        {
            PagedResponse<AppUser> pagedResponse = new PagedResponse<AppUser>();
            int totalRows = 0;
            List<AppUser> UserList = new List<AppUser>();
            dataProvider.ExecuteCmd(
                "AppUser_SelectAll",
                (parameters) =>
                {
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                    //parameters.AddWithValue("@Search", q);
                },
                (reader, resultSetIndex) =>
                {
                    AppUser appUser = new AppUser();
                    appUser.Id = (int)reader["Id"];
                    appUser.FirstName = (string)reader["FirstName"];
                    appUser.LastName = (string)reader["LastName"];
                    appUser.PasswordHash = (string)reader["PasswordHash"];
                    appUser.Email = (string)reader["Email"];
                    appUser.AvatarUrl = (string)reader["AvatarUrl"];
                    appUser.TenantId = (int)reader["TenantId"];
                    appUser.DateCreated = (DateTime)reader["DateCreated"];
                    appUser.DateModified = (DateTime)reader["DateModified"];

                    UserList.Add(appUser);
                    totalRows = (int)reader["TotalRows"];
                });
            pagedResponse.TotalCount = totalRows;
            pagedResponse.PagedItems = UserList;
            return pagedResponse;
        }

        public AppUser SelectById(int? id)
        {
            AppUser appUser = new AppUser();
            dataProvider.ExecuteCmd(
                "AppUser_SelectById1",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                (reader, resultSetIndex) =>
                {
                    switch (resultSetIndex)
                    {
                        case 0:
                    appUser.Id = (int)reader["Id"];
                    appUser.FirstName = (string)reader["FirstName"];
                    appUser.LastName = (string)reader["LastName"];
                    appUser.Email = (string)reader["Email"];
                    appUser.AvatarUrl = reader["AvatarUrl"] as string;
                    appUser.TenantId = (int)reader["TenantId"];
                    appUser.DateCreated = (DateTime)reader["DateCreated"];
                    appUser.DateModified = (DateTime)reader["DateModified"];
                            appUser.CustomerBusinessId = reader.GetSafeInt32Nullable("CustomerBusinessId");
                            appUser.CustomerBusinessName = reader.GetSafeString("CustomerBusinessName");
                            appUser.DefaultBusinessId = reader.GetSafeInt32Nullable("DefaultBusinessId");
                            appUser.DefaultBusinessName = reader.GetSafeString("DefaultBusinessName");
                            break;
                        case 1:
                            if(appUser.UserRoleIds == null)
                            {
                                appUser.UserRoleIds = new List<int>();
                            }
                            int appUserRoleId = reader.GetSafeInt32("UserRoleId");
                            appUser.UserRoleIds.Add(appUserRoleId);
                            break;
                        case 2:
                            if(appUser.Businesses == null)
                            {
                                appUser.Businesses = new List<BusinessBase>();
                            }
                            BusinessBase bb = new BusinessBase()
                            {
                                Id = reader.GetSafeInt32("Id"),
                                Name = reader.GetSafeString("Name")
                            };
                            appUser.Businesses.Add(bb);
                            break;
                    }
                });

            return appUser;
        }

        public PagedResponse<AppUserRole> GetAllUserRoles(int pageIndex, int pageSize)
        {
            PagedResponse<AppUserRole> pagedResponse = new PagedResponse<AppUserRole>();
            int totalRows = 0;
            List<AppUserRole> UserList = new List<AppUserRole>();
            dataProvider.ExecuteCmd(
                "AppUser_Selected_Roles",
                (parameters) =>
                {
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                    //parameters.AddWithValue("@Search", q);
                },
                (reader, resultSetIndex) =>
                {
                    AppUserRole appUser = new AppUserRole();
                    appUser.Id = (int)reader["Id"];
                    appUser.FirstName = (string)reader["FirstName"];
                    appUser.LastName = (string)reader["LastName"];
                    appUser.Email = (string)reader["Email"];
                    appUser.Admin = (bool)reader["Admin"];
                    appUser.AgencyRep = (bool)reader["AgencyRep"];
                    appUser.BusinessOwner = (bool)reader["BusinessOwner"];
                    

                    UserList.Add(appUser);
                    totalRows = (int)reader["TotalRows"];
                });
            pagedResponse.TotalCount = totalRows;
            pagedResponse.PagedItems = UserList;
            return pagedResponse;
        }

        public PagedResponse<AppUserRole> GetAllUserRolesSearch(int pageIndex, int pageSize, string q)
        {
            PagedResponse<AppUserRole> pagedResponse = new PagedResponse<AppUserRole>();
            int totalRows = 0;
            List<AppUserRole> UserList = new List<AppUserRole>();
            dataProvider.ExecuteCmd(
                "AppUser_Selected_Roles_Search",
                (parameters) =>
                {
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                    parameters.AddWithValue("@Search", q);
                },
                (reader, resultSetIndex) =>
                {
                    AppUserRole appUser = new AppUserRole();
                    appUser.Id = (int)reader["Id"];
                    appUser.FirstName = (string)reader["FirstName"];
                    appUser.LastName = (string)reader["LastName"];
                    appUser.Email = (string)reader["Email"];
                    appUser.Admin = (bool)reader["Admin"];
                    appUser.AgencyRep = (bool)reader["AgencyRep"];
                    appUser.BusinessOwner = (bool)reader["BusinessOwner"];

                    UserList.Add(appUser);
                    totalRows = (int)reader["TotalRows"];
                });
            pagedResponse.TotalCount = totalRows;
            pagedResponse.PagedItems = UserList;
            return pagedResponse;
        }

        public int Create(AppUserCreateRequest request)
        {
            int newId = 0;
            string password = BCrypt.HashPassword(request.Password);

            dataProvider.ExecuteNonQuery(
                "AppUser_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@FirstName", request.FirstName);
                    parameters.AddWithValue("@LastName", request.LastName);
                    parameters.AddWithValue("@PasswordHash", password);
                    parameters.AddWithValue("@Email", request.Email);
                    parameters.AddWithValue("@RegisterToken", request.RegisterToken);
                    parameters.AddWithValue("@IsConfirmed", 0);
                    parameters.AddWithValue("@TenantId", request.TenantId);
                    parameters.AddWithValue("@CustomerBusinessId", request.CustomerBusinessId);
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });
            return newId;
        }

        public void CreateUserRole(AppUserRoleAddRequest request)
        {
            dataProvider.ExecuteNonQuery(
                "AppUserRole_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@AppUserId", request.AppUserId);
                    parameters.AddWithValue("@UserRoleId", request.UserRoleId);
                    parameters.AddWithValue("@CheckState", request.CheckState);
                });
        }

        public void Update(AppUserUpdateRequest request)
        {
            dataProvider.ExecuteNonQuery(
                "AppUser_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", request.Id);
                    parameters.AddWithValue("@FirstName", request.FirstName);
                    parameters.AddWithValue("@LastName", request.LastName);
                    parameters.AddWithValue("@PasswordHash", request.Password);
                    parameters.AddWithValue("@Email", request.Email);
                    parameters.AddWithValue("@TenantId", 1);
                });
        }

        public void Delete(int id)
        {
            dataProvider.ExecuteNonQuery(
                "AppUser_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                });
        }

        public void RegisterConfirm(string Token)
        {
            dataProvider.ExecuteNonQuery(
                "AppUser_Confirm",
                (parameters) =>
                {
                    parameters.AddWithValue("@RegisterToken", Token);
                });
        }

        public Confirm Confirm(AppUserConfirmRequest req)
        {
            Confirm confirm = new Confirm();
            dataProvider.ExecuteCmd(
                "AppUser_GetByEmail",
                (parameters) =>
                {
                    parameters.AddWithValue("@Email", req.Email);
                },


                (reader, resultSetIndex) =>
                {
                    confirm.IsConfirmed = (bool)reader["IsConfirmed"];
                    confirm.RegisterDateStamp = (DateTime)reader["RegisterDateStamp"];
                });

            return confirm;
        }

        public LoginResult Login(AppUserLoginRequest req)
        {
            string PasswordHash = null;
            LoginResult result = new LoginResult();
            dataProvider.ExecuteCmd(
                "AppUser_GetByEmail",
                (parameters) =>
                {
                    parameters.AddWithValue("@Email", req.Email);
                },
                (reader, resultSetIndex) =>
                {
                    PasswordHash = (string)reader["PasswordHash"];
                    result.Id = (int)reader["Id"];
                    result.TenantId = (int)reader["TenantId"];
                });
       
            if (BCrypt.Verify(req.Password, PasswordHash))
            {
                return result;
            }
            else 
            {
                return null;
            }
        }

        // this defines a public method named ForgotPassword that returns
        // an instance of ForgotPasswordResult and takes one parameter of type
        // ForgotPasswordRequest.

    
           public bool ForgotPassword(AppUserForgotPasswordRequest req)

        {
            ForgotPasswordResult forgotPassword = new ForgotPasswordResult();

            string ResetToken = null;
            string FirstName = null;


            dataProvider.ExecuteNonQuery(


                "AppUser_Validate",
                (parameters) =>

                 {
                     parameters.AddWithValue("@Email", req.Email);
                   

                     parameters.Add("@FirstName", SqlDbType.NVarChar, 20).Direction = ParameterDirection.Output;
                     
                     parameters.Add("@ResetToken", SqlDbType.NVarChar, 50).Direction = ParameterDirection.Output;
                     
                 },
                // the stuff above goes to the database, after the database code is finsihed, gets the data or nulls. 
                (parameters)=>

                //setting empty box to be filled when we get the data back from database. 

                {
                    FirstName= parameters["@FirstName"].Value as string; 
                    ResetToken = parameters["@ResetToken"].Value as string;
                    

                });

           
            if (ResetToken!=null)
            {
                EmailSenderService.SendForgotPasswordEmail(FirstName, ResetToken, req.Email).Wait();
                
                return true;
            }
            else
            {
                return false;
            }    
        }


             public bool ResetNewPassword(AppUserResetNewPasswordRequest req)
        {
            AppUserResetPasswordResult resetPassResult = new AppUserResetPasswordResult();


            string Password = BCrypt.HashPassword(req.PasswordHash);
            string FirstName = null;
            string Email = null;
            

            dataProvider.ExecuteNonQuery(
               "AppUser_ResetPassword",
               (parameters) =>
               {
                   parameters.AddWithValue("@PasswordHash", Password);

                   parameters.AddWithValue("@ResetToken", req.ResetToken);

                   parameters.Add("@FirstName", SqlDbType.NVarChar, 20).Direction = ParameterDirection.Output;
                   parameters.Add("@Email", SqlDbType.NVarChar, 50).Direction = ParameterDirection.Output;
                   

                  },

             (parameters) =>{

                 
                   FirstName = parameters["@FirstName"].Value as string;
                   Email = parameters["@Email"].Value as string; 
                   
               });


            if (Email!= null)

            {
                EmailSenderService.SendNewPasswordEmailConfirmation(FirstName, Email).Wait();
                return true;
            }
            else
            {
             return false;
            }

        }

        public int ConfirmPasswordToken(AppUserConfirmPassRequest req)

        {
            string resetToken = null;
            int id = 1;
            bool success = false;


            dataProvider.ExecuteNonQuery(
                "AppUser_ConfirmPassword",
                (parameters) =>

                {
                    parameters.AddWithValue("@ResetToken", req.ResetToken);
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    parameters.Add("@Success", SqlDbType.Bit).Direction = ParameterDirection.Output;

                },

                  (parameters) =>

                  //setting empty box to be filled when we get the data back from database. 

                  {
                      
                      success = (bool)parameters["@Success"].Value;

                  });

            if (success)
            {
                
                return id; 
            }
            else
            {
                return 2;
            }

        }

    


    }
}

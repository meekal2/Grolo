using System;
using System.Collections.Generic;

namespace Sabio.Models.Domain
{
    public class AppUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }
        public int TenantId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int? CustomerBusinessId { get; set; }
        public string CustomerBusinessName { get; set; }
        public int?  DefaultBusinessId { get; set; }
        public string DefaultBusinessName { get; set; }
        public List<int> UserRoleIds { get; set; }
        public List<BusinessBase> Businesses { get; set; }
    }
}

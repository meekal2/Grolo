using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class AppUserCreateRequest
    {
        public AppUserCreateRequest()
        {
        RegisterToken = Guid.NewGuid().ToString();

        }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string RegisterToken { get; set; }
        [Required]
        public int TenantId { get; set; }
        public int? CustomerBusinessId { get; set; }
        public bool IsConfirmed { get; set; }

        public DateTime RegisterDateStamp { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

    }


}

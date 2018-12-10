using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class AppUserRoleAddRequest
    {
        [Required]
        public int AppUserId { get; set; }
        [Required]
        public int UserRoleId { get; set; }
        [Required]
        public bool CheckState { get; set; }
    }
}

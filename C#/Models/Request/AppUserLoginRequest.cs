﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class AppUserLoginRequest
    {
        
        public string Email { get; set; }
        public string Password { get; set; }
        public int? Id { get; set; }
        public int TenantId { get; set; }
    }
}

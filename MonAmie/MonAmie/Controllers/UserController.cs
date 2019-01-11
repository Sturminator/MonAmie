using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonAmieData.Interfaces;

namespace MonAmie.Controllers
{
    public class UserController : Controller
    {
        private IUserService _user;

        public UserController(IUserService user)
        {
            _user = user;
        }
    }
}

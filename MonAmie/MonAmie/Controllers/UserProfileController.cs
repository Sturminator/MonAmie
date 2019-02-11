using Microsoft.AspNetCore.Mvc;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System.Collections.Generic;
using System.Linq;
using MonAmieData.Models;

namespace MonAmie.Controllers
{
    public class UserProfileController : Controller
    {
        private IUserService userService;

        public UserProfileController(IUserService userService)
        {
            this.userService = userService;
        }
    }
}

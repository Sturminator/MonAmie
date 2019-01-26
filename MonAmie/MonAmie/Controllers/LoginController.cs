using Microsoft.AspNetCore.Mvc;
using System.Web.Http;
using System.Net.Http;
using MonAmie.Models;
using MonAmieData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonAmieData.Models;

namespace MonAmie.Controllers
{
    public class LoginController : Controller
    {
        private IUserService _users;
        private IPasswordService _passwords;

        public LoginController(IUserService users, IPasswordService passwords)
        {
            _users = users;
            _passwords = passwords;
        }

        [HttpGet]
        [Route("api/Login/ValidateUser")]
        public bool ValidateUser(string emailInput, string passwordInput)
        {
            var user = _users.GetByEmail(emailInput);

            if(user != null)
            {
                var hashedPwdInput = _passwords.GenerateSHA256Hash(passwordInput, user.PasswordSalt);

                if (hashedPwdInput == user.PasswordHash)
                    return true;
            }

            return false;
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using MonAmie.Models;
using MonAmieData.Interfaces;
using System.Collections.Generic;
using System.Linq;
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

        public class LoginInfo
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        [Route("api/Login/ValidateUser")]
        public IActionResult ValidateUser([FromBody] LoginInfo login)
        {
            var emailInput = login.Email;
            var passwordInput = login.Password;

            var user = _users.GetByEmail(emailInput);

            if(user != null)
            {
                var hashedPwdInput = _passwords.GenerateSHA256Hash(passwordInput, user.PasswordSalt);

                if (hashedPwdInput == user.PasswordHash)
                    return Ok(new
                    {
                        Id = user.UserId,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        ValidLogin = true
                    });
            }

            return BadRequest(new { message = "Username or password is incorrect", ValidLogin = false });
        }
    }
}
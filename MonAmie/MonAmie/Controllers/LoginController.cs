using Microsoft.AspNetCore.Mvc;
using MonAmie.Models;
using MonAmieData.Interfaces;
using System.Collections.Generic;
using System.Linq;
using MonAmieData.Models;
using System;

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
            public string BirthDate { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
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
                        ValidLogin = true
                    });
            }

            return BadRequest(new { message = "Username or password is incorrect", ValidLogin = false });
        }

        [HttpPost]
        [Route("api/Login/RegisterUser")]
        public IActionResult RegisterUser([FromBody] LoginInfo login)
        {
            var emailInput = login.Email.ToLower();
            var passwordInput = login.Password;
            var firstName = login.FirstName;
            var lastName = login.LastName;

            if(DateTime.TryParse(login.BirthDate, out DateTime dobInput))
            {
                if(_users.IsEmailAvailable(emailInput))
                {
                    var salt = _passwords.CreateSalt(16);
                    var hash = _passwords.GenerateSHA256Hash(passwordInput, salt);

                    User user = new User
                    {
                        FirstName = firstName,
                        LastName = lastName,
                        Email = emailInput,
                        BirthDate = dobInput,
                        PasswordSalt = salt,
                        PasswordHash = hash,
                        CreationDate = DateTime.UtcNow,
                        LastLoginDate = DateTime.UtcNow
                    };
                }
            }

            return BadRequest(new { message = "User already exists", UserTaken = true });
        }
    }
}
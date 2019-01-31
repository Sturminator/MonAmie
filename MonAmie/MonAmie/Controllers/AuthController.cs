using System;
using MonAmieData.ViewModels;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using MonAmie.ViewModels;

namespace MonAmie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthService authService;
        private IUserService userService;
        private IPasswordService passwordService;

        public AuthController(IAuthService authService, IUserService userService, IPasswordService passwordService)
        {
            this.authService = authService;
            this.userService = userService;
            this.passwordService = passwordService;
        }

        [HttpPost("login")]
        public ActionResult<AuthData> Post([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = userService.GetByEmail(model.Email);

            if(user == null)
                return BadRequest(new { email = "No user exists with this email" });

            var hashedPwdInput = passwordService.GenerateSHA256Hash(model.Password, user.PasswordSalt);

            if(hashedPwdInput != user.PasswordHash)
                return BadRequest(new { password = "Invalid password" });

            return authService.GetAuthData(user.UserId);
        }

        [HttpPost("register")]
        public ActionResult<AuthData> Post([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var isEmailAvailable = userService.IsEmailAvailable(model.Email);

            if(!isEmailAvailable)
                return BadRequest(new { email = "A user with this email already exists" });

            if(DateTime.TryParse(model.BirthDate, out DateTime birthDate))
            {
                var salt = passwordService.CreateSalt(16);
                var hash = passwordService.GenerateSHA256Hash(model.Password, salt);

                User user = new User
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    BirthDate = birthDate,
                    PasswordSalt = salt,
                    PasswordHash = hash,
                    CreationDate = DateTime.UtcNow,
                    LastLoginDate = DateTime.UtcNow
                };

                userService.AddUser(user);

                return authService.GetAuthData(userService.GetByEmail(user.Email).UserId);
            }

            return BadRequest(new { birthDate = "The date entered is not valid" });
        }
    }
}
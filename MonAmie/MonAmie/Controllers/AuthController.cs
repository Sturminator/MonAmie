using System;
using MonAmieData.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using MonAmie.Helpers;
using MonAmie.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using MonAmieData.Models;

namespace MonAmie.Controllers
{
    [Authorize]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserService userService;
        private IPasswordService passwordService;
        private readonly AppSettings appSettings;

        public AuthController(IUserService userService, IPasswordService passwordService, IOptions<AppSettings> appSettings)
        {
            this.userService = userService;
            this.passwordService = passwordService;
            this.appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/Auth/Login")]
        public IActionResult Login([FromBody]UserDto userDto)
        {
            var user = userService.GetByEmail(userDto.Email);

            if (user == null)
                return BadRequest(new { message = "Incorrect email/password" });

            var hashedPwd = passwordService.GenerateSHA256Hash(userDto.Password, user.PasswordSalt);

            if (hashedPwd != user.PasswordHash)
                return BadRequest(new { message = "Incorrect email/password" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Id = user.UserId,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthdate = user.BirthDate,
                Age = userService.CalculateUserAge(user.BirthDate),
                Gender =  user.Gender,
                State = user.State,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/Auth/Register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            var emailInput = userDto.Email.ToLower();
            var passwordInput = userDto.Password;
            var firstName = userDto.FirstName;
            var lastName = userDto.LastName;
            var state = userDto.State;
            var gender = userDto.Gender;

            if (DateTime.TryParse(userDto.Birthdate, out DateTime dobInput))
            {
                if(userService.IsEmailAvailable(emailInput))
                {
                    try
                    {
                        var salt = passwordService.CreateSalt(16);
                        var hash = passwordService.GenerateSHA256Hash(passwordInput, salt);

                        User user = new User
                        {
                            FirstName = firstName,
                            LastName = lastName,
                            Email = emailInput,
                            BirthDate = dobInput,
                            Gender = gender,
                            State = state,
                            PasswordSalt = salt,
                            PasswordHash = hash,
                            CreationDate = DateTime.UtcNow,
                            LastLoginDate = DateTime.UtcNow
                        };

                        userService.AddUser(user);

                        return Ok();
                    }
                    catch (AppException ex)
                    {
                        return BadRequest(new { message = ex.Message });
                    }
                }
                return BadRequest(new { message = "Email already registered" });
            }

            return BadRequest(new { message = "Birthdate entered is not correctly formatted" });
        }
    }
}
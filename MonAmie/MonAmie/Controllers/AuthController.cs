using System;
using AutoMapper;
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
        [Route("api/Auth/authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = userService.GetByEmail(userDto.Email);

            if (user == null)
                return BadRequest(new { message = "No user registered to this email" });

            var hashedPwd = passwordService.GenerateSHA256Hash(userDto.Password, user.PasswordSalt);

            if (hashedPwd != user.PasswordHash)
                return BadRequest(new { message = "Password is incorrect" });

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
                Token = tokenString
            });
        }
    }
}
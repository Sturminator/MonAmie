using Microsoft.AspNetCore.Mvc;
using System.Web.Http;
using System.Net.Http;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonAmieData.Models;

namespace MonAmie.Controllers
{
    [ApiController]
    public class UserController : Controller
    {
        private IUserService _users;

        public UserController(IUserService users)
        {
            _users = users;
        }

        [HttpGet]
        [Route("api/User/GetAll")]
        public IActionResult GetAll()
        {
            var users = _users.GetAllUsers();

            var results = users.Select(result => new
            {
                Id = result.UserId,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Gender = result.Gender,
                State = result.State,
                Age = _users.CalculateUserAge(result.BirthDate)
            }).ToList();

            return Ok(results);
        }

        [HttpGet]
        [Route("api/User/Get/{id}")]
        public IActionResult Get(int id)
        {
            var user = _users.GetById(id);

            return Ok(new {
                Id = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Gender = user.Gender,
                State = user.State,
                Age = _users.CalculateUserAge(user.BirthDate),
            });
        }
    }
}

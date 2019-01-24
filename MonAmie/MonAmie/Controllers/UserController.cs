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
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IUserService _users;

        public UserController(IUserService users)
        {
            _users = users;
        }

        [HttpGet("[action]")]
        public IEnumerable<UserViewModel> GetAll()
        {
            var users = _users.GetAllUsers();

            var results = users.Select(result => new UserViewModel
            {
                UserId = result.UserId,
                FirstName = result.FirstName,
                LastName = result.LastName,
                BirthDate = result.BirthDate,
                Email = result.Email,
                PhoneNumber = result.PhoneNumber
            });

            return results.ToList();
        }

        [HttpGet("[action]")]
        public UserViewModel Get(int id)
        {
            var user = _users.GetById(id);

            return new UserViewModel
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };
        }

        [HttpPost("[action]")]
        public void Add(User user)
        {
            _users.AddUser(user);
        }
    }
}

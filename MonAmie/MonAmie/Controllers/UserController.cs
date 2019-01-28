﻿using Microsoft.AspNetCore.Mvc;
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
    public class UserController : Controller
    {
        private IUserService _users;

        public UserController(IUserService users)
        {
            _users = users;
        }

        [HttpGet]
        [Route("api/User/GetAll")]
        public IEnumerable<UserViewModel> GetAll()
        {
            var users = _users.GetAllUsers();

            var results = users.Select(result => new UserViewModel
            {
                UserId = result.UserId,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Age = _users.CalculateUserAge(result.BirthDate)
            });

            return results.ToList();
        }

        [HttpGet]
        [Route("api/User/Get/{id}")]
        public UserViewModel Get(int id)
        {
            var user = _users.GetById(id);

            var userAddress = _users.GetUserAddressByUserId(id); 

            return new UserViewModel
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Age = _users.CalculateUserAge(user.BirthDate),
                City = userAddress.City,
                State = userAddress.State
            };
        }

        [HttpPost]
        [Route("api/User/Add")]
        public void Add(User user)
        {
            _users.AddUser(user);
        }
    }
}

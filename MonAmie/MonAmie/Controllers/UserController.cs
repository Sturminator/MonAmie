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
        private IUserService userService;
        private IFriendService friendService;

        public UserController(IUserService userService, IFriendService friendService)
        {
            this.userService = userService;
            this.friendService = friendService;
        }

        [HttpGet]
        [Route("api/User/GetAll")]
        public IActionResult GetAll()
        {
            var users = userService.GetAllUsers();

            var results = users.Select(result => new
            {
                Id = result.UserId,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Gender = result.Gender,
                State = result.State,
                Age = userService.CalculateUserAge(result.BirthDate)
            }).ToList();

            return Ok(results);
        }

        [HttpGet]
        [Route("api/User/GetAllForUser/{id}")]
        public IActionResult GetAllForUser(int id)
        {
            var users = userService.GetAllUsers();
            var friends = friendService.GetAllFriendshipsForUser(id);
            var friendRequests = friendService.GetAllFriendRequestsForUser(id);
            var sentRequests = friendService.GetAllSentFriendRequestsForUser(id);

            users = users.Where(u => !friends.Any(f => f.FriendId == u.UserId));
            users = users.Where(u => !friendRequests.Any(fr => fr.UserId == u.UserId));
            users = users.Where(u => !sentRequests.Any(sr => sr.PendingFriendId == u.UserId));

            var results = users.Select(result => new
            {
                Id = result.UserId,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Gender = result.Gender,
                State = result.State,
                Age = userService.CalculateUserAge(result.BirthDate)
            }).ToList();

            return Ok(results);
        }

        [HttpGet]
        [Route("api/User/Get/{id}")]
        public IActionResult Get(int id)
        {
            var user = userService.GetById(id);

            return Ok(new {
                Id = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Gender = user.Gender,
                State = user.State,
                Age = userService.CalculateUserAge(user.BirthDate),
            });
        }
    }
}

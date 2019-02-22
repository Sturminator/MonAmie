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
    public class FriendController : Controller
    {
        private IFriendService friendService;
        private IUserService userService;

        public FriendController(IFriendService friendService, IUserService userService)
        {
            this.friendService = friendService;
            this.userService = userService;
        }

        [HttpGet]
        [Route("api/Friend/GetAllFriends/{id}")]
        public IActionResult GetAllFriends(int id)
        {
            var friendships = friendService.GetAllFriendshipsForUser(id);
            List<Object> results = new List<Object>();

            foreach (var friendship in friendships)
            {
                var friend = userService.GetById(friendship.FriendId);              

                results.Add(new
                {
                    Id = friendship.FriendId,
                    FirstName = friend.FirstName,
                    LastName = friend.LastName,
                    Gender = friend.Gender,
                    State = friend.State,
                    Age = userService.CalculateUserAge(friend.BirthDate)
                });
            }

            return Ok(results);

        }

        [HttpGet]
        [Route("api/Friend/GetAllFriendRequests/{id}")]
        public IActionResult GetAllFriendRequests(int id)
        {
            var friendRequests = friendService.GetAllFriendRequestsForUser(id);
            var sentRequests = friendService.GetAllSentFriendRequestsForUser(id);

            List<Object> results = new List<Object>();

            foreach(var request in friendRequests)
            {
                var friend = userService.GetById(request.UserId);

                results.Add(new
                {
                    Id = friend.UserId,
                    FirstName = friend.FirstName,
                    LastName = friend.LastName,
                    Gender = friend.Gender,
                    State = friend.State,
                    Age = userService.CalculateUserAge(friend.BirthDate),
                    incoming = true
                });
            }

            foreach (var request in sentRequests)
            {
                var friend = userService.GetById(request.PendingFriendId);

                results.Add(new
                {
                    Id = friend.UserId,
                    FirstName = friend.FirstName,
                    LastName = friend.LastName,
                    Gender = friend.Gender,
                    State = friend.State,
                    Age = userService.CalculateUserAge(friend.BirthDate),
                    incoming = false
                });
            }

            return Ok(results);
        }
    }
}

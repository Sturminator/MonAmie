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
        [Route("api/Friend/GetAllFriends")]
        public IActionResult GetAllFriends(int id)
        {
            var friendships = friendService.GetAllFriendshipsForUser(id);

            var results = friendships.Select(friendship => new
            {
                Id = friendship.FriendId,
                FirstName = friendship.Friend.FirstName,
                LastName = friendship.Friend.LastName,
                Gender = friendship.Friend.Gender,
                State = friendship.Friend.State,
                Age = userService.CalculateUserAge(friendship.Friend.BirthDate)
            }).ToList();

            return Ok(results);
        }

        [HttpGet]
        [Route("api/Friend/GetAllFriendRequests")]
        public IActionResult GetAllFriendRequests(int id)
        {
            var friendRequests = friendService.GetAllFriendRequestsForUser(id);

            var results = friendRequests.Select(friendRequest => new
            {
                Id = friendRequest.PendingFriendId,
                FirstName = friendRequest.PendingFriend.FirstName,
                LastName = friendRequest.PendingFriend.LastName,
                Gender = friendRequest.PendingFriend.Gender,
                State = friendRequest.PendingFriend.State,
                Age = userService.CalculateUserAge(friendRequest.PendingFriend.BirthDate)
            }).ToList();

            return Ok(results);
        }
    }
}

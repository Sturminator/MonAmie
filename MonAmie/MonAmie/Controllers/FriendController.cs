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

        [HttpPost]
        [Route("api/Friend/AddFriend/{id}")]
        public IActionResult AddFriend(int id, [FromBody]int pendingId)
        {
            if(id == pendingId)
            {
                return BadRequest("Can't add yourself.");
            }

            if(id < 1 || pendingId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.AddFriendRequest(id, pendingId);

            return GetAllFriendRequests(id);
        }

        [HttpDelete]
        [Route("api/Friend/DeleteFriend/{id}")]
        public IActionResult DeleteFriend(int id, [FromBody]int friendId)
        {
            if (id < 1 || friendId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.DeleteFriendship(id, friendId);

            return GetAllFriends(id);
        }

        [HttpDelete]
        [Route("api/Friend/CancelFriendRequest/{id}")]
        public IActionResult CancelFriendRequest(int id, [FromBody]int pendingId)
        {
            if (id < 1 || pendingId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.DeleteFriendRequest(id, pendingId);

            return GetAllFriendRequests(id);
        }

        [HttpDelete]
        [Route("api/Friend/DenyFriendRequest/{id}")]
        public IActionResult DenyFriendRequest(int id, [FromBody]int pendingId)
        {
            if (id < 1 || pendingId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.DeleteFriendRequest(pendingId, id);

            return GetAllFriendRequests(id);
        }

        [HttpPost]
        [Route("api/Friend/AcceptFriendRequest/{id}")]
        public IActionResult AcceptFriendRequest(int id, [FromBody]int pendingId)
        {
            if (id < 1 || pendingId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.DeleteFriendRequest(pendingId, id);

            friendService.AddFriendship(id, pendingId);

            return GetAllFriends(id);
        }
    }
}

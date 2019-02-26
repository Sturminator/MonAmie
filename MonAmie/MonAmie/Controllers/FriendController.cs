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

        public class Friend
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Gender { get; set; }
            public string State { get; set; }
            public int Age { get; set; }
        }

        public class FriendRequest
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Gender { get; set; }
            public string State { get; set; }
            public int Age { get; set; }
            public bool Incoming { get; set; }
        }

        public class Friends
        {
            public int FriendId { get; set; }
            public List<Friend> CurrentFriends { get; set; }
        }

        public class Requests
        {
            public int PendingId { get; set; }
            public List<FriendRequest> CurrentRequests { get; set; }
        }

        [HttpGet]
        [Route("api/Friend/GetAllFriends/{id}")]
        public IActionResult GetAllFriends(int id)
        {
            var friendships = friendService.GetAllFriendshipsForUser(id);
            List<Friend> results = new List<Friend>();

            foreach (var friendship in friendships)
            {
                var friend = userService.GetById(friendship.FriendId);

                results.Add(new Friend
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

            List<FriendRequest> results = new List<FriendRequest>();

            foreach (var request in friendRequests)
            {
                var friend = userService.GetById(request.UserId);

                results.Add(new FriendRequest
                {
                    Id = friend.UserId,
                    FirstName = friend.FirstName,
                    LastName = friend.LastName,
                    Gender = friend.Gender,
                    State = friend.State,
                    Age = userService.CalculateUserAge(friend.BirthDate),
                    Incoming = true
                });
            }

            foreach (var request in sentRequests)
            {
                var friend = userService.GetById(request.PendingFriendId);

                results.Add(new FriendRequest
                {
                    Id = friend.UserId,
                    FirstName = friend.FirstName,
                    LastName = friend.LastName,
                    Gender = friend.Gender,
                    State = friend.State,
                    Age = userService.CalculateUserAge(friend.BirthDate),
                    Incoming = false
                });
            }

            return Ok(results);
        }

        [HttpPost]
        [Route("api/Friend/AddFriend/{id}")]
        public IActionResult AddFriend(int id, [FromBody]Requests currentRequests)
        {
            if (id == currentRequests.PendingId)
            {
                return BadRequest("Can't add yourself.");
            }

            if (id < 1 || currentRequests.PendingId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.AddFriendRequest(id, currentRequests.PendingId);

            var friend = userService.GetById(currentRequests.PendingId);
            var friendRequests = currentRequests.CurrentRequests;

            if(friendRequests == null)
            {
                friendRequests = new List<FriendRequest>();
            }

            friendRequests.Add(new FriendRequest
            {
                Id = friend.UserId,
                FirstName = friend.FirstName,
                LastName = friend.LastName,
                Gender = friend.Gender,
                State = friend.State,
                Age = userService.CalculateUserAge(friend.BirthDate),
                Incoming = false
            });

            return Ok(friendRequests);
        }

        [HttpDelete]
        [Route("api/Friend/DeleteFriend/{id}")]
        public IActionResult DeleteFriend(int id, [FromBody]Friends currentFriends)
        {
            if (id < 1 || currentFriends.FriendId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            var friends = currentFriends.CurrentFriends;

            friendService.DeleteFriendship(id, currentFriends.FriendId);

            friends = friends.Where(f => f.Id != currentFriends.FriendId).ToList();

            return Ok(friends);
        }

        [HttpDelete]
        [Route("api/Friend/CancelFriendRequest/{id}")]
        public IActionResult CancelFriendRequest(int id, [FromBody]Requests currentRequests)
        {
            if (id < 1 || currentRequests.PendingId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.DeleteFriendRequest(id, currentRequests.PendingId);

            var requests = currentRequests.CurrentRequests;

            requests = requests.Where(r => r.Id != currentRequests.PendingId).ToList();

            return Ok(requests);
        }

        [HttpDelete]
        [Route("api/Friend/DenyFriendRequest/{id}")]
        public IActionResult DenyFriendRequest(int id, [FromBody]Requests currentRequests)
        {
            if (id < 1 || currentRequests.PendingId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.DeleteFriendRequest(currentRequests.PendingId, id);

            var requests = currentRequests.CurrentRequests;

            requests = requests.Where(r => r.Id != currentRequests.PendingId).ToList();

            return Ok(requests);
        }

        [HttpPost]
        [Route("api/Friend/AcceptFriendRequest/{id}")]
        public IActionResult AcceptFriendRequest(int id, [FromBody]Requests currentRequests)
        {
            if (id < 1 || currentRequests.PendingId < 1)
            {
                return BadRequest("Bad ID request.");
            }

            friendService.DeleteFriendRequest(currentRequests.PendingId, id);

            friendService.AddFriendship(id, currentRequests.PendingId);

            var requests = currentRequests.CurrentRequests;

            requests = requests.Where(r => r.Id != currentRequests.PendingId).ToList();

            return Ok(requests);
        }

        [HttpPut]
        [Route("api/Friend/AddToCurrentFriends/{id}")]
        public IActionResult AddToCurrentFriends(int id, [FromBody]List<Friend> currentFriends)
        {
            var friend = userService.GetById(id);

            currentFriends.Add(new Friend
            {
                Id = friend.UserId,
                FirstName = friend.FirstName,
                LastName = friend.LastName,
                Gender = friend.Gender,
                State = friend.State,
                Age = userService.CalculateUserAge(friend.BirthDate)
            });

            return Ok(currentFriends);
        }

    }
}

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
        private ICategoryService categoryService;

        public UserController(IUserService userService, IFriendService friendService, ICategoryService categoryService)
        {
            this.userService = userService;
            this.friendService = friendService;
            this.categoryService = categoryService;
        }

        public class UserDisplay
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Gender { get; set; }
            public string State { get; set; }
            public int Age { get; set; }
            public string InterestsInfo { get; set; }
            public int SharedCount { get; set; }

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
            var categories = categoryService.GetAllCategories();
            var friendRequests = friendService.GetAllFriendRequestsForUser(id);
            var sentRequests = friendService.GetAllSentFriendRequestsForUser(id);
            var loggedInInterests = categoryService.GetAllCategoriesForUser(id);

            users = users.Where(u => !friends.Any(f => f.FriendId == u.UserId));
            users = users.Where(u => !friendRequests.Any(fr => fr.UserId == u.UserId));
            users = users.Where(u => !sentRequests.Any(sr => sr.PendingFriendId == u.UserId));
            users = users.Where(u => u.UserId != id);

            List<UserDisplay> results = new List<UserDisplay>();

            foreach(var user in users)
            {
                var userInterests = categoryService.GetAllCategoriesForUser(user.UserId);

                var sharedInterests = userInterests.Where(ui => loggedInInterests.Any(lii => lii.CategoryId == ui.CategoryId));

                var interestsInfo = user.FirstName + " has no interests currently";

                int count = 0;

                if (userInterests.Count() > 0)
                {
                    if(sharedInterests.Count() > 0)
                    {
                        foreach(var i in sharedInterests)
                        {
                            if (count == 3)
                            {
                                break;
                            }
                            else if (count == 0)
                            {
                                interestsInfo = user.FirstName + " is into " + categories.SingleOrDefault(c => c.CategoryId == i.CategoryId).CategoryName;
                            }
                            else
                            {
                                interestsInfo += ", " + categories.SingleOrDefault(c => c.CategoryId == i.CategoryId).CategoryName;
                            }
                            count++;
                        }
                    }
                    else
                    {
                        foreach (var i in userInterests)
                        {
                            if (count == 3)
                            {
                                break;
                            }
                            else if (count == 0)
                            {
                                interestsInfo = user.FirstName + " is into " + categories.SingleOrDefault(c => c.CategoryId == i.CategoryId).CategoryName;
                            }
                            else
                            {
                                interestsInfo += ", " + categories.SingleOrDefault(c => c.CategoryId == i.CategoryId).CategoryName;
                            }
                            count++;
                        }
                    }
                }

                results.Add(new UserDisplay
                {
                    Id = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Gender = user.Gender,
                    State = user.State,
                    Age = userService.CalculateUserAge(user.BirthDate),
                    InterestsInfo = interestsInfo,
                    SharedCount = sharedInterests.Count()
                });
            }

            results = results.OrderByDescending(res => res.SharedCount).ToList();

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

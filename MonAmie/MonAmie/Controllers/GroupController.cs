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
    public class GroupController : Controller
    {
        private IGroupService groupService;
        private ICategoryService categoryService;
        private IUserService userService;

        public GroupController(IGroupService groupService, ICategoryService categoryService, IUserService userService)
        {
            this.groupService = groupService;
            this.categoryService = categoryService;
            this.userService = userService;
        }

        public class GroupMember
        {
            public int UserId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string State { get; set; }
        }

        public class GroupActivity
        {
            public int ActivityId { get; set; }
            public int UserId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Type { get; set; }
            public string Date { get; set; }
        }

        public class GroupViewModel
        {
            public int GroupId { get; set; }
            public string GroupName { get; set; }
            public string Description { get; set; }
            public string CategoryName { get; set; }
            public int OwnerId { get; set; }
            public int CategoryId { get; set; }
            public string State { get; set; }
            public int MemberCount { get; set; }
            public string CreationDate { get; set; }
            public GroupMember Owner { get; set; }
            public List<GroupMember> GroupMembers { get; set; }
            public List<GroupActivity> GroupActivity { get; set; }
            public List<GroupViewModel> UserGroups { get; set; }
        }

        public class Groups
        {
            public string CategoryName { get; set; }
            public int CategoryId { get; set; }
            public List<GroupViewModel> GroupList { get; set; }
        }

        [HttpGet]
        [Route("api/Group/GetAll")]
        public IActionResult GetAll()
        {
            var groups = groupService.GetAllGroups();
            var categories = categoryService.GetAllCategories();

            var results = groups.Select(result => new GroupViewModel
            {
                GroupId = result.GroupId,
                GroupName = result.GroupName,
                Description = result.Description,
                State = result.State,
                CategoryId = result.CategoryId,
                OwnerId = result.OwnerId,
                MemberCount = groupService.GetMemberCount(result.GroupId),
                CategoryName = categories.FirstOrDefault(c => c.CategoryId == result.CategoryId).CategoryName,
                CreationDate = result.CreationDate.ToString("MMMM") + " " + result.CreationDate.Year
            }).ToList().OrderBy(c => c.CategoryName);

            return Ok(results);
        }

        [HttpGet]
        [Route("groups/api/Group/GetAllForCategory/{id}")]
        public IActionResult GetAllForCategory(int id)
        {
            var groups = groupService.GetAllGroupsForCategory(id);
            var category = categoryService.GetById(id);

            List<GroupViewModel> groupViews = new List<GroupViewModel>();

            foreach (var g in groups)
            {
                groupViews.Add(new GroupViewModel
                {
                    GroupId = g.GroupId,
                    GroupName = g.GroupName,
                    Description = g.Description,
                    State = g.State,
                    CategoryId = g.CategoryId,
                    OwnerId = g.OwnerId,
                    CategoryName = category.CategoryName,
                    MemberCount = groupService.GetMemberCount(g.GroupId),
                    CreationDate = g.CreationDate.ToString("MMMM") + " " + g.CreationDate.Year
                });
            }

            return Ok(new Groups
            {
                GroupList = groupViews.OrderBy(gv => gv.GroupName).ToList(),
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName
            });
        }

        [HttpGet]
        [Route("api/Group/GetAllForUser/{id}")]
        [Route("profile/api/Group/GetAllForUser/{id}")]
        public IActionResult GetAllForUser(int id)
        {
            var ownedGroups = groupService.GetAllGroupsUserOwns(id).ToList();
            var memberGroups = groupService.GetAllGroupsUserBelongsTo(id).ToList();
            var categories = categoryService.GetAllCategories();

            List<GroupViewModel> groups = new List<GroupViewModel>();

            foreach (var g in ownedGroups)
            {
                groups.Add(new GroupViewModel
                {
                    GroupId = g.GroupId,
                    GroupName = g.GroupName,
                    Description = g.Description,
                    State = g.State,
                    CategoryId = g.CategoryId,
                    OwnerId = g.OwnerId,
                    MemberCount = groupService.GetMemberCount(g.GroupId),
                    CategoryName = categories.FirstOrDefault(c => c.CategoryId == g.CategoryId).CategoryName,
                    CreationDate = g.CreationDate.ToString("MMMM") + " " + g.CreationDate.Year
                });
            }

            foreach (var g in memberGroups)
            {
                groups.Add(new GroupViewModel
                {
                    GroupId = g.GroupId,
                    GroupName = g.GroupName,
                    Description = g.Description,
                    State = g.State,
                    CategoryId = g.CategoryId,
                    OwnerId = g.OwnerId,
                    MemberCount = groupService.GetMemberCount(g.GroupId),
                    CategoryName = categories.FirstOrDefault(c => c.CategoryId == g.CategoryId).CategoryName,
                    CreationDate = g.CreationDate.ToString("MMMM") + " " + g.CreationDate.Year
                });
            }

            groups = groups.OrderBy(g => g.OwnerId).ThenBy(g => g.GroupName).ToList();

            return Ok(groups);
        }

        [HttpGet]
        [Route("group/api/Group/GetGroup/{groupId}")]
        public IActionResult GetGroup(int groupId)
        {
            if (groupId < 1)
                return BadRequest("Invalid groupId of " + groupId + ".");

            var group = groupService.GetGroup(groupId);

            if (group == null)
                return NotFound("Group could not be found.");

            var owner = userService.GetById(group.OwnerId);
            var groupMembers = groupService.GetAllUsersInGroup(groupId).ToList();
            var groupActivity = groupService.GetActivityForGroup(groupId).OrderByDescending(ga => ga.CreationDate).ToList();
            var categories = categoryService.GetAllCategories();

            List<GroupMember> memberList = new List<GroupMember>();
            List<GroupActivity> activityList = new List<GroupActivity>();

            foreach (var gm in groupMembers)
            {
                var groupMember = userService.GetById(gm.UserId);

                memberList.Add(new GroupMember
                {
                    UserId = groupMember.UserId,
                    FirstName = groupMember.FirstName,
                    LastName = groupMember.LastName,
                    State = groupMember.State
                });
            }

            foreach(var ga in groupActivity)
            {
                var user = userService.GetById(ga.UserId);

                var dateWhen = DateTime.UtcNow - ga.CreationDate;

                activityList.Add(new GroupActivity
                {
                    ActivityId = ga.GroupHasActivityId,
                    UserId = ga.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Type = ga.Type,
                    Date = GetDateString(dateWhen)
                });

            }

            var results = new GroupViewModel
            {
                GroupId = group.GroupId,
                GroupName = group.GroupName,
                Description = group.Description,
                State = group.State,
                CategoryId = group.CategoryId,
                OwnerId = group.OwnerId,
                MemberCount = groupMembers.Count + 1,
                CategoryName = categories.FirstOrDefault(c => c.CategoryId == group.CategoryId).CategoryName,
                CreationDate = group.CreationDate.ToString("MMMM") + " " + group.CreationDate.Year,
                Owner = new GroupMember
                {
                    UserId = owner.UserId,
                    FirstName = owner.FirstName,
                    LastName = owner.LastName,
                    State = owner.State
                },
                GroupMembers = memberList.OrderBy(gm => gm.LastName).ToList(),
                GroupActivity = activityList.ToList()
            };

            return Ok(results);
        }

        [HttpPost]
        [Route("api/Group/AddGroup/{ownerId}")]
        public IActionResult AddGroup(int ownerId, [FromBody]GroupViewModel group)
        {
            if (group == null)
                return BadRequest("Group cannot be null.");

            if (ownerId < 1)
                return BadRequest("Owner not found as user.");

            if (string.IsNullOrEmpty(group.Description) || string.IsNullOrEmpty(group.State) || string.IsNullOrEmpty(group.GroupName) || group.CategoryId < 1)
                return BadRequest("Missing a description, state, group name, or category.");

            var categories = categoryService.GetAllCategories();

            var creationDate = DateTime.UtcNow;

            var groupId = groupService.AddGroup(new Group
            {
                GroupName = group.GroupName,
                Description = group.Description,
                CategoryId = group.CategoryId,
                OwnerId = ownerId,
                State = group.State,
                CreationDate = creationDate
            });

            if(groupId > 0)
            {
                group.UserGroups.Add(new GroupViewModel
                {
                    GroupId = groupId,
                    GroupName = group.GroupName,
                    Description = group.Description,
                    State = group.State,
                    CategoryId = group.CategoryId,
                    OwnerId = ownerId,
                    MemberCount = 1,
                    CategoryName = categories.FirstOrDefault(c => c.CategoryId == group.CategoryId).CategoryName,
                    CreationDate = creationDate.ToString("MMMM") + " " + creationDate.Year
                });
            }

            List<GroupViewModel> groups = group.UserGroups.OrderBy(g => g.OwnerId).ThenBy(g => g.GroupName).ToList();

            return Ok(groups);
        }

        [HttpPut]
        [Route("group/api/Group/UpdateGroup/{groupId}")]
        public IActionResult UpdateGroup(int groupId, [FromBody]GroupViewModel group)
        {
            if (group == null)
                return BadRequest("Group cannot be null.");

            if (group.GroupId < 1)
                return BadRequest("Group does not exist.");

            if (string.IsNullOrEmpty(group.Description) || string.IsNullOrEmpty(group.State) || string.IsNullOrEmpty(group.GroupName) || group.CategoryId < 1)
                return BadRequest("Missing a description, state, group name, or category.");

            var categories = categoryService.GetAllCategories();

            group.CategoryName = categories.FirstOrDefault(c => c.CategoryId == group.CategoryId).CategoryName;

            groupService.UpdateGroup(new Group
            {
                GroupId = group.GroupId,
                GroupName = group.GroupName,
                Description = group.Description,
                State = group.State,
                CategoryId = group.CategoryId,
                OwnerId = group.OwnerId,
                CreationDate = DateTime.UtcNow
            });

            return Ok(group);
        }

        [HttpDelete]
        [Route("api/Group/DeleteGroup/{groupId}")]
        [Route("group/api/Group/DeleteGroup/{groupId}")]
        public IActionResult DeleteGroup(int groupId, [FromBody]GroupViewModel group)
        {
            if (groupId < 1)
                return BadRequest("Group Id cannot be less than 1");

            var userIds = new List<int>();

            foreach(var gm in group.GroupMembers)
            {
                userIds.Add(gm.UserId);
            }

            groupService.DeleteGroup(groupId, userIds);

            return Ok(null);
        }

        [HttpPost]
        [Route("group/api/Group/AddUserToGroup/{userId}")]
        public IActionResult AddUserToGroup(int userId, [FromBody]GroupViewModel group)
        {
            if (group == null)
                return BadRequest("Group cannot be null.");

            if (group.GroupId < 1)
                return BadRequest("Group does not exist.");

            if (userId < 1)
                return BadRequest("User does not exist");

            var categories = categoryService.GetAllCategories();

            group.CategoryName = categories.FirstOrDefault(c => c.CategoryId == group.CategoryId).CategoryName;

            var user = userService.GetById(userId);

            if (user == null)
                return NotFound("User could not be found");

            var activityId = groupService.AddUserToGroup(userId, group.GroupId);

            group.GroupMembers.Add(new GroupMember
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                State = user.State
            });

            if(activityId != 0)
            {
                group.GroupActivity.Insert(0, new GroupActivity
                {
                    ActivityId = activityId,
                    UserId = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Date = "Just Now",
                    Type = "JOIN"
                });
            }

            group.GroupMembers.OrderBy(gm => gm.LastName).ToList();

            group.MemberCount = group.MemberCount + 1;

            return Ok(group);
        }

        [HttpDelete]
        [Route("group/api/Group/RemoveUserFromGroup/{userId}")]
        public IActionResult RemoveUserFromGroup(int userId, [FromBody]GroupViewModel group)
        {
            if (group == null)
                return BadRequest("Group cannot be null.");

            if (group.GroupId < 1)
                return BadRequest("Group does not exist.");

            if (userId < 1)
                return BadRequest("User does not exist");

            var categories = categoryService.GetAllCategories();

            group.CategoryName = categories.FirstOrDefault(c => c.CategoryId == group.CategoryId).CategoryName;

            var user = group.GroupMembers.FirstOrDefault(gm => gm.UserId == userId);

            if (user == null)
                return NotFound("User could not be found");

            var activityId = groupService.RemoveUserFromGroup(userId, group.GroupId);

            if (activityId != 0)
            {
                group.GroupActivity.Insert(0, new GroupActivity
                {
                    ActivityId = activityId,
                    UserId = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Date = "Just Now",
                    Type = "LEAVE"
                });
            }

            group.GroupMembers.Remove(user);

            group.MemberCount = group.MemberCount - 1;

            return Ok(group);
        }

        private string GetDateString(TimeSpan dateWhen)
        {
            var dateString = "";

            if (dateWhen.Hours < 1 && dateWhen.Minutes < 1)
            {
                dateString = "Just Now";
            }
            else if (dateWhen.Hours < 1 && dateWhen.Minutes >= 1)
            {
                if (dateWhen.Minutes == 1)
                    dateString = dateWhen.Minutes + " Minute Ago";
                else
                    dateString = dateWhen.Minutes + " Minutes Ago";
            }
            else if (dateWhen.Hours >= 1 && dateWhen.Days < 1)
            {
                if (dateWhen.Hours == 1)
                    dateString = dateWhen.Hours + " Hour Ago";
                else
                    dateString = dateWhen.Hours + " Hours Ago";
            }
            else if (dateWhen.Days < 30)
            {
                if (dateWhen.Days == 1)
                    dateString = dateWhen.Days + " Days Ago";
                else
                    dateString = dateWhen.Days + " Days Ago";
            }
            else if (dateWhen.Days < 365)
            {
                double monthsDouble = dateWhen.Days / 30;

                int months = Convert.ToInt32(Math.Floor(monthsDouble));

                if (months == 1)
                    dateString = months + " Month Ago";
                else
                    dateString = months + " Months Ago";
            }
            else
            {
                double yearsDouble = dateWhen.Days / 365;

                int years = Convert.ToInt32(Math.Floor(yearsDouble));

                if (years == 1)
                    dateString = years + " Year Ago";
                else
                    dateString = years + " Years Ago";
            }

            return dateString;
        }
    }
}
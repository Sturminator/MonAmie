﻿using Microsoft.AspNetCore.Mvc;
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
            public DateTime CreationDate { get; set; }
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
                CreationDate = result.CreationDate
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

            foreach(var g in groups)
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
                    CreationDate = g.CreationDate
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
                    CreationDate = g.CreationDate
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
                    CreationDate = g.CreationDate
                });
            }

            groups = groups.OrderBy(g => g.OwnerId).ThenBy(g => g.GroupName).ToList();

            return Ok(groups);
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

            groupService.AddGroup(new Group
            {
                GroupName = group.GroupName,
                Description = group.Description,
                CategoryId = group.CategoryId,
                OwnerId = ownerId,
                State = group.State,
                CreationDate = DateTime.UtcNow
            });

            return Ok();
        }

        [HttpPut]
        [Route("api/Group/UpdateGroup")]
        public IActionResult UpdateGroup([FromBody]Group group)
        {
            if (group == null)
                return BadRequest("Group cannot be null.");

            if (group.GroupId < 1)
                return BadRequest("Group does not exist.");

            if (string.IsNullOrEmpty(group.Description) || string.IsNullOrEmpty(group.State) || string.IsNullOrEmpty(group.GroupName) || group.CategoryId < 1)
                return BadRequest("Missing a description, state, group name, or category.");

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

            return Ok();
        }

        [HttpGet]
        [Route("api/Group/DeleteGroup/{id}")]
        public IActionResult DeleteGroup(int id)
        {
            if (id < 1)
                return BadRequest("Group Id cannot be less than 1");

            groupService.DeleteGroup(id);

            return Ok();
        }
    }
}
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

        public class GroupViewModel
        {
            public int GroupId { get; set; }
            public string GroupName { get; set; }
            public string Description { get; set; }
            public string CategoryName { get; set; }
            public int CategoryId { get; set; }
            public string State { get; set; }
            public DateTime CreationDate { get; set; }
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
                CategoryName = categories.FirstOrDefault(c => c.CategoryId == result.CategoryId).CategoryName,
                CreationDate = result.CreationDate
            }).ToList().OrderBy(c => c.CategoryName);

            return Ok(results);
        }

        [HttpGet]
        [Route("api/Group/GetAllForCategory/{id}")]
        public IActionResult GetAllForCategory(int id)
        {
            var groups = groupService.GetAllGroupsForCategory(id);
            var category = categoryService.GetById(id);

            var results = groups.Select(result => new GroupViewModel
            {
                GroupId = result.GroupId,
                GroupName = result.GroupName,
                Description = result.Description,
                State = result.State,
                CategoryId = result.CategoryId,
                CategoryName = category.CategoryName,
                CreationDate = result.CreationDate
            }).ToList().OrderBy(c => c.CategoryName);

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
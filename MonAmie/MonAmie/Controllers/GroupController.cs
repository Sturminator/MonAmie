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
        
        public GroupController(IGroupService groupService)
        {
            this.groupService = groupService;
        }

        public class Group
        {
            public int GroupId { get; set; }
            public string GroupName { get; set; }
            public string Description { get; set; }
            public int CategoryId { get; set; }
            public DateTime CreationDate { get; set; }
        }

        [HttpGet]
        [Route("api/Group/GetAll")]
        public IActionResult GetAll()
        {
            return Ok();
        }

        [HttpGet]
        [Route("api/Group/GetAllForCategory/{id}")]
        public IActionResult GetAllForCategory(int id)
        {
            return Ok();
        }

        [HttpPost]
        [Route("api/Group/AddGroup")]
        public IActionResult AddGroup([FromBody]Group group)
        {
            
            return Ok();
        }

        [HttpPut]
        [Route("api/Group/UpdateGroup")]
        public IActionResult UpdateGroup([FromBody]Group group)
        {
            return Ok();
        }

        [HttpGet]
        [Route("api/Group/DeleteGroup/{id}")]
        public IActionResult DeleteGroup(int id)
        {
            return Ok();
        }
    }
}
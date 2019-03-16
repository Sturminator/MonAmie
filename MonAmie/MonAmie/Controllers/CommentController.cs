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
    public class CommentController : Controller
    {
        private ICommentService commentService;
        private IUserService userService;

        public CommentController(ICommentService commentService, IUserService userService)
        {
            this.commentService = commentService;
            this.userService = userService;
        }

        public class GroupCommentModel
        {
            public int GroupCommentId { get; set; }
            public int GroupId { get; set; }
            public int UserId { get; set; }
            public int ParentId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Comment { get; set; }
            public string Date { get; set; }
        }

        public class GroupCommentViewModel
        {
            public GroupCommentModel Comment { get; set; }
            public List<GroupCommentModel> CurrentComments { get; set; }
        }

        [HttpGet]
        [Route("api/Comment/GetAllForGroup/{groupId}")]
        [Route("group/api/Comment/GetAllForGroup/{groupId}")]
        public IActionResult GetAllForGroup(int groupId)
        {
            var comments = commentService.GetCommentsForGroup(groupId).OrderByDescending(gc => gc.PostDate).ToList();

            List<GroupCommentModel> results = new List<GroupCommentModel>();

            foreach (var comment in comments)
            {
                var user = userService.GetById(comment.UserId);
                var dateWhen = DateTime.UtcNow - comment.PostDate;

                results.Add(new GroupCommentModel
                {
                    GroupCommentId = comment.GroupCommentId,
                    GroupId = comment.GroupId,
                    UserId = comment.UserId,
                    ParentId = comment.ParentId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Comment = comment.Comment,
                    Date = GetDateString(dateWhen)
                });
            }

            return Ok(results);
        }

        [HttpPost]
        [Route("api/GroupComment/AddGroupComment/{groupId}")]
        [Route("group/api/GroupComment/AddGroupComment/{groupId}")]
        public IActionResult AddGroupComment(int groupId, [FromBody]GroupCommentViewModel groupComment)
        {
            if (groupComment == null)
                return BadRequest("Comment cannot be null.");

            if (groupId < 1)
                return BadRequest("Group could not be found.");

            if (string.IsNullOrEmpty(groupComment.Comment.Comment))
                return BadRequest("Missing a comment.");

            var groupCommentId = commentService.AddGroupComment(new GroupComment
            {
                GroupId = groupId,
                UserId = groupComment.Comment.UserId,
                ParentId = groupComment.Comment.ParentId,
                Comment = groupComment.Comment.Comment,
                PostDate = DateTime.UtcNow              
            });

            if (groupCommentId > 0)
            {
                var user = userService.GetById(groupComment.Comment.UserId);

                groupComment.CurrentComments.Add(new GroupCommentModel
                {
                    GroupCommentId = groupCommentId,
                    GroupId = groupComment.Comment.GroupId,
                    UserId = groupComment.Comment.UserId,
                    ParentId = groupComment.Comment.ParentId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Comment = groupComment.Comment.Comment,
                    Date = "Just Now"
                });
            }

            return Ok(groupComment.CurrentComments);
        }

        [HttpPut]
        [Route("api/GroupComment/UpdateGroupComment/{groupCommentId}")]
        [Route("group/api/GroupComment/UpdateGroupComment/{groupCommentId}")]
        public IActionResult UpdateGroupComment(int groupCommentId, [FromBody]GroupCommentViewModel groupComment)
        {
            if (groupComment == null)
                return BadRequest("Comment cannot be null.");

            if (groupCommentId < 1)
                return BadRequest("Group could not be found.");

            if (string.IsNullOrEmpty(groupComment.Comment.Comment))
                return BadRequest("Missing a comment.");

            commentService.UpdateGroupComment(groupCommentId, groupComment.Comment.Comment);

            groupComment.CurrentComments.FirstOrDefault(cc => cc.GroupCommentId == groupCommentId).Comment = groupComment.Comment.Comment;


            return Ok(groupComment.CurrentComments);
        }

        [HttpDelete]
        [Route("api/GroupComment/DeleteGroupComment/{groupCommentId}")]
        [Route("group/api/GroupComment/DeleteGroupComment/{groupCommentId}")]
        public IActionResult DeleteGroupComment(int groupCommentId, [FromBody]List<GroupCommentModel> currentComments)
        {
            if (groupCommentId < 1)
                return BadRequest("Group Comment Id cannot be less than 1");

            commentService.DeleteGroupComment(groupCommentId);

            var comment = currentComments.FirstOrDefault(cc => cc.GroupCommentId == groupCommentId);

            currentComments.Remove(comment);

            var childComments = currentComments.Where(cc => cc.ParentId == groupCommentId);

            foreach(var child in childComments)
            {
                currentComments.Remove(child);
            }

            return Ok(currentComments);
        }

        private string GetDateString(TimeSpan dateWhen)
        {
            var dateString = "";

            if (dateWhen.Hours < 1 && dateWhen.Minutes < 1 && dateWhen.Days == 0)
            {
                dateString = "Just Now";
            }
            else if (dateWhen.Hours < 1 && dateWhen.Minutes >= 1 && dateWhen.Days == 0)
            {
                if (dateWhen.Minutes == 1)
                    dateString = dateWhen.Minutes + " Minute Ago";
                else
                    dateString = dateWhen.Minutes + " Minutes Ago";
            }
            else if (dateWhen.Hours >= 1 && dateWhen.Days < 1 && dateWhen.Days == 0)
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

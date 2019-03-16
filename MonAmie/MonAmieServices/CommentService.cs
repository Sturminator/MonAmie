using Microsoft.EntityFrameworkCore;
using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class CommentService : ICommentService
    {
        private MonAmieContext _context;

        public CommentService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public CommentService(MonAmieContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Adds a group comment to the database
        /// </summary>
        /// <param name="groupComment"></param>
        /// <returns></returns>
        public int AddGroupComment(GroupComment groupComment)
        {
            if (groupComment != null)
            {
                _context.GroupComment.Add(groupComment);
                _context.SaveChanges();
            }
            return groupComment.GroupCommentId;
        }

        /// <summary>
        /// Deletes a group comment from the database
        /// </summary>
        /// <param name="groupCommentId"></param>
        public void DeleteGroupComment(int groupCommentId)
        {
            var groupComment = _context.GroupComment.FirstOrDefault(g => g.GroupCommentId == groupCommentId);
            var childComments = _context.GroupComment.Where(g => g.ParentId == groupCommentId);

            if (groupComment != null)
            {
                foreach (var comment in childComments)
                {
                    if (comment != null)
                    {
                        _context.GroupComment.Remove(comment);
                    }
                }

                _context.GroupComment.Remove(groupComment);
                _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Gets all comments for a group
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public IEnumerable<GroupComment> GetCommentsForGroup(int groupId)
        {
            return _context.GroupComment.Where(gc => gc.GroupId == groupId);
        }

        /// <summary>
        /// Updates an existing group comment in the database
        /// </summary>
        /// <param name="groupCommentId"></param>
        /// <param name="editedComment"></param>
        /// <returns></returns>
        public void UpdateGroupComment(int groupCommentId, string editedComment)
        {
            var entity = _context.GroupComment.SingleOrDefault(g => g.GroupCommentId == groupCommentId);

            if (entity != null)
            {
                entity.Comment = editedComment;

                _context.GroupComment.Update(entity);
                _context.SaveChangesAsync();
            }
        }
    }
}

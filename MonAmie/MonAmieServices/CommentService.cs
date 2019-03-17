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

                if(groupComment.ParentId != null)
                {
                    var entity = _context.GroupComment.FirstOrDefault(gc => gc.GroupCommentId == groupComment.ParentId);

                    if(!entity.HasChildren)
                    {
                        entity.HasChildren = true;

                        _context.GroupComment.Update(entity);
                    }
                }

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

            if (groupComment != null)
            {
                var childComments = _context.GroupComment.Where(g => g.ParentId == groupCommentId).ToList();

                if (childComments.Count > 0)
                    DeleteChildren(childComments);

                foreach (var comment in childComments)
                {
                    if (comment != null)
                    {
                        _context.GroupComment.Remove(comment);
                    }
                }

                _context.GroupComment.Remove(groupComment);

                if(!_context.GroupComment.Any(gc => gc.ParentId == groupComment.ParentId))
                {
                    var entity = _context.GroupComment.FirstOrDefault(gc => gc.GroupCommentId == groupComment.ParentId);

                    entity.HasChildren = false;

                    _context.Update(entity);
                }

                _context.SaveChangesAsync();
            }
        }

        private void DeleteChildren(IEnumerable<GroupComment> children)
        {
            foreach (var comment in children)
            {
                var childComments = _context.GroupComment.Where(g => g.ParentId == comment.GroupCommentId).ToList();

                if (childComments.Count > 0)
                    DeleteChildren(childComments);

                if (comment != null)
                {
                    _context.GroupComment.Remove(comment);
                }
            }
        }

        /// <summary>
        /// Gets any children comments for a group comment
        /// </summary>
        /// <param name="groupCommentId"></param>
        /// <returns></returns>
        public IEnumerable<GroupComment> GetChildCommentsForGroupComment(int groupCommentId)
        {
            return _context.GroupComment.Where(gc => gc.ParentId == groupCommentId);
        }

        /// <summary>
        /// Gets all comments for a group
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public IEnumerable<GroupComment> GetCommentsForGroup(int groupId)
        {
            return _context.GroupComment.Where(gc => gc.GroupId == groupId && gc.ParentId == null);
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

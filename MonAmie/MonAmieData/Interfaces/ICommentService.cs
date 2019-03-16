using MonAmieData.Models;
using System;
using System.Collections.Generic;

namespace MonAmieData.Interfaces
{
    public interface ICommentService
    {
        /// <summary>
        /// Gets all comments for a group
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        IEnumerable<GroupComment> GetCommentsForGroup(int groupId);

        /// <summary>
        /// Adds a group comment to the database
        /// </summary>
        /// <param name="groupComment"></param>
        /// <returns></returns>
        int AddGroupComment(GroupComment groupComment);

        /// <summary>
        /// Updates an existing group comment in the database
        /// </summary>
        /// <param name="groupCommentId"></param>
        /// <param name="editedComment"></param>
        /// <returns></returns>
        void UpdateGroupComment(int groupCommentId, string editedComment);

        /// <summary>
        /// Deletes a group comment from the database
        /// </summary>
        /// <param name="groupCommentId"></param>
        void DeleteGroupComment(int groupCommentId);
    }
}

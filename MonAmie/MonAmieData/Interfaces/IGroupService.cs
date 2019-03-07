using MonAmieData.Models;
using System;
using System.Collections.Generic;

namespace MonAmieData.Interfaces
{
    public interface IGroupService
    {
        /// <summary>
        /// Get all groups in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<Group> GetAllGroups();

        /// <summary>
        /// Get all groups belonging to a category
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        IEnumerable<Group> GetAllGroupsForCategory(int categoryId);

        /// <summary>
        /// Get all groups a user belongs to
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<Group> GetAllGroupsUserBelongsTo(int userId);

        /// <summary>
        /// Get all groups a user owns
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<Group> GetAllGroupsUserOwns(int userId);

        /// <summary>
        /// Gets a group by its id
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        Group GetGroup(int groupId);

        /// <summary>
        /// Adds a group to the database
        /// </summary>
        /// <param name="group"></param>
        void AddGroup(Group group);

        /// <summary>
        /// Update a group in the database
        /// </summary>
        /// <param name="group"></param>
        void UpdateGroup(Group group);

        /// <summary>
        /// Delete a group from the database
        /// </summary>
        /// <param name="groupId"></param>
        void DeleteGroup(int groupId);

        /// <summary>
        /// Gets all the users in a group (not including the owner)
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        IEnumerable<GroupHasUser> GetAllUsersInGroup(int groupId);

        /// <summary>
        /// Get the number of users in a group
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        int GetMemberCount(int groupId);

    }
}

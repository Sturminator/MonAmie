using Microsoft.EntityFrameworkCore;
using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class GroupService : IGroupService
    {
        private MonAmieContext _context;

        public GroupService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public GroupService(MonAmieContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Adds a group to the database
        /// </summary>
        /// <param name="group"></param>
        public int AddGroup(Group group)
        {
            if (group != null)
            {
                _context.Group.Add(group);
                _context.GroupHasActivity.Add(new GroupHasActivity
                {
                    GroupId = group.GroupId,
                    UserId = group.OwnerId,
                    Type = "CREATION",
                    CreationDate = group.CreationDate
                });
                _context.SaveChanges();
            }
            return group.GroupId;
        }

        /// <summary>
        /// Gets a newly created group's id
        /// </summary>
        /// <param name="ownerId"></param>
        /// <param name="creationDate"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public int GetCreatedGroupId(int ownerId, DateTime creationDate, string groupName)
        {
            return _context.Group.FirstOrDefault(g => g.OwnerId == ownerId && g.CreationDate == creationDate && g.GroupName == groupName).GroupId;
        }

        /// <summary>
        /// Adds a user to a group
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        public int AddUserToGroup(int userId, int groupId)
        {
            var entity = _context.GroupHasUser.FirstOrDefault(ghu => ghu.UserId == userId && ghu.GroupId == groupId);

            if (entity == null)
            {
                _context.GroupHasUser.Add(new GroupHasUser
                {
                    UserId = userId,
                    GroupId = groupId,
                    JoinDate = DateTime.UtcNow
                });

                var activity = new GroupHasActivity
                {
                    GroupId = groupId,
                    UserId = userId,
                    Type = "JOIN",
                    CreationDate = DateTime.UtcNow
                };

                _context.GroupHasActivity.Add(activity);
                _context.SaveChangesAsync();

                return activity.GroupHasActivityId;
            }

            return 0;
        }

        /// <summary>
        /// Delete a group from the database
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="userIds"></param>
        public void DeleteGroup(int groupId, List<int> userIds)
        {
            var group = _context.Group.FirstOrDefault(g => g.GroupId == groupId);

            if (group != null)
            {
                foreach (var id in userIds)
                {
                    var entity = _context.GroupHasUser.FirstOrDefault(ghu => ghu.UserId == id && ghu.GroupId == groupId);

                    if (entity != null)
                    {
                        _context.GroupHasUser.Remove(entity);
                    }
                }

                var activity = _context.GroupHasActivity.Where(gha => gha.GroupId == groupId);

                foreach (var act in activity)
                {
                    _context.GroupHasActivity.Remove(act);
                }

                _context.Group.Remove(group);
                _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Get all groups in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Group> GetAllGroups()
        {
            return _context.Group;
        }

        /// <summary>
        /// Get all groups belonging to a category
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public IEnumerable<Group> GetAllGroupsForCategory(int categoryId)
        {
            return _context.Group.Where(g => g.CategoryId == categoryId);
        }

        /// <summary>
        /// Get all groups a user belongs to
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public IEnumerable<Group> GetAllGroupsUserBelongsTo(int userId)
        {
            var groupUsers = _context.GroupHasUser.Where(ghu => ghu.UserId == userId);

            return _context.Group.Where(g => groupUsers.Any(ghu => ghu.GroupId == g.GroupId));
        }

        /// <summary>
        /// Get all groups a user owns
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public IEnumerable<Group> GetAllGroupsUserOwns(int userId)
        {
            return _context.Group.Where(g => g.OwnerId == userId);
        }

        /// <summary>
        /// Gets all the users in a group (not including the owner)
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public IEnumerable<GroupHasUser> GetAllUsersInGroup(int groupId)
        {
            return _context.GroupHasUser.Where(ghu => ghu.GroupId == groupId);
        }

        /// <summary>
        /// Gets a group by its id
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public Group GetGroup(int groupId)
        {
            return _context.Group.FirstOrDefault(g => g.GroupId == groupId);
        }

        /// <summary>
        /// Get the number of users in a group
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public int GetMemberCount(int groupId)
        {
            return _context.GroupHasUser.Where(g => g.GroupId == groupId).Count() + 1; // add 1 for the owner
        }

        /// <summary>
        /// Removes a user from a group
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        public int RemoveUserFromGroup(int userId, int groupId)
        {
            var entity = _context.GroupHasUser.FirstOrDefault(ghu => ghu.UserId == userId && ghu.GroupId == groupId);

            if (entity != null)
            {
                _context.GroupHasUser.Remove(entity);

                var activity = new GroupHasActivity
                {
                    GroupId = groupId,
                    UserId = userId,
                    Type = "LEAVE",
                    CreationDate = DateTime.UtcNow
                };

                _context.GroupHasActivity.Add(activity);
                _context.SaveChangesAsync();

                return activity.GroupHasActivityId;
            }

            return 0;
        }

        /// <summary>
        /// Update a group in the database
        /// </summary>
        /// <param name="group"></param>
        public int UpdateGroup(Group group)
        {
            var entity = _context.Group.SingleOrDefault(g => g.GroupId == group.GroupId);

            if (entity != null)
            {
                var activity = new GroupHasActivity();

                if (entity.Description != group.Description)
                {
                     
                    activity = new GroupHasActivity
                    {
                        GroupId = group.GroupId,
                        UserId = group.OwnerId,
                        Type = "DESC",
                        NewVal = group.Description,
                        CreationDate = DateTime.UtcNow
                    };

                    _context.GroupHasActivity.Add(activity);
                }

                entity.GroupName = group.GroupName;
                entity.Description = group.Description;
                entity.CategoryId = group.CategoryId;
                entity.OwnerId = group.OwnerId;
                entity.State = group.State;

                _context.Group.Update(entity);
                _context.SaveChangesAsync();

                return activity.GroupHasActivityId;
            }

            return 0;
        }

        /// <summary>
        /// Gets all activity for a group
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public IEnumerable<GroupHasActivity> GetActivityForGroup(int groupId)
        {
            return _context.GroupHasActivity.Where(gha => gha.GroupId == groupId);
        }

        /// <summary>
        /// Get all groups in a state
        /// </summary>
        /// <param name="state"></param>
        /// <returns></returns>
        public IEnumerable<Group> GetAllGroupsForState(string state)
        {
            return _context.Group.Where(g => g.State == state);
        }
    }
}

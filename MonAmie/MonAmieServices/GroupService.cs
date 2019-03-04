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
        public void AddGroup(Group group)
        {
            if(group != null)
            {
                _context.Group.Add(group);
                _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Delete a group from the database
        /// </summary>
        /// <param name="groupId"></param>
        public void DeleteGroup(int groupId)
        {
            var group = _context.Group.FirstOrDefault(g => g.GroupId == groupId);

            if (group != null)
            {
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
        /// Update a group in the database
        /// </summary>
        /// <param name="group"></param>
        public void UpdateGroup(Group group)
        {
            var entity = _context.Group.SingleOrDefault(g => g.GroupId == group.GroupId);

            if (entity != null)
            {
                entity.GroupName = group.GroupName;
                entity.Description = group.GroupName;
                entity.CategoryId = group.CategoryId;
                entity.OwnerId = group.OwnerId;
                entity.State = group.State;

                _context.Group.Update(entity);
                _context.SaveChangesAsync();
            }
        }
    }
}

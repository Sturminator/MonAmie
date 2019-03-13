using Microsoft.EntityFrameworkCore;
using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class GroupImageService : IGroupImageService
    {
        private MonAmieContext _context;

        /// <summary>
        /// 
        /// </summary>
        public GroupImageService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public GroupImageService(MonAmieContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add a group image to the database
        /// </summary>
        /// <param name="groupImage"></param>
        public void AddGroupImage(GroupImage groupImage)
        {
            var entity = _context.GroupImage.FirstOrDefault(ui => ui.GroupId == groupImage.GroupId);

            if (entity == null)
            {
                _context.GroupImage.Add(groupImage);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Delete a group image from the database
        /// </summary>
        /// <param name="groupImage"></param>
        public void DeleteGroupImage(GroupImage groupImage)
        {
            var entity = _context.GroupImage.FirstOrDefault(ui => ui.GroupId == groupImage.GroupId);

            if (entity != null)
            {
                _context.GroupImage.Remove(entity);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Gets all group images in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<GroupImage> GetAllGroupImages()
        {
            return _context.GroupImage;
        }

        /// <summary>
        /// Gets a group image by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public GroupImage GetById(int id)
        {
            return _context.GroupImage.FirstOrDefault(ui => ui.GroupImageId == id);
        }

        /// <summary>
        /// Gets a group image by its group id
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public GroupImage GetByGroupId(int groupId)
        {
            return _context.GroupImage.FirstOrDefault(ui => ui.GroupId == groupId);
        }

        /// <summary>
        /// Update a group image in the database
        /// </summary>
        /// <param name="groupImage"></param>
        public void UpdateGroupImage(GroupImage groupImage)
        {
            var entity = _context.GroupImage.FirstOrDefault(ui => ui.GroupId == groupImage.GroupId);

            if (entity != null)
            {
                _context.GroupImage.Remove(entity);
                _context.SaveChanges();

                _context.GroupImage.Add(groupImage);
                _context.SaveChanges();
            }
        }
    }
}

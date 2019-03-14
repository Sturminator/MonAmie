using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System.Linq;


namespace MonAmieServices
{
    class GroupImageService : IGroupImageService
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
        /// 
        /// </summary>
        /// <param name="groupImage"></param>
        public void AddGroupImage(GroupImage groupImage)
        {
            var entity = _context.GroupImage.FirstOrDefault(gi => gi.GroupId == groupImage.GroupId);

            if (entity == null)
            {
                _context.GroupImage.Add(groupImage);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="groupImage"></param>
        public void DeleteGroupImage(GroupImage groupImage)
        {
            var entity = _context.GroupImage.FirstOrDefault(gi => gi.GroupId == groupImage.GroupId);

            if (entity != null)
            {
                _context.GroupImage.Remove(groupImage);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<GroupImage> GetAllGroupImages()
        {
            return _context.GroupImage;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public GroupImage GetByGroupId(int groupId)
        {
            return _context.GroupImage.FirstOrDefault(gi => gi.GroupId == groupId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public GroupImage GetById(int id)
        {
            return _context.GroupImage.FirstOrDefault(gi => gi.GroupImageId == id);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="groupImage"></param>
        public void UpdateGroupImage(GroupImage groupImage)
        {
            var entity = _context.GroupImage.FirstOrDefault(gi => gi.GroupId == groupImage.GroupId);

            if (entity != null)
            {
                entity.FileName = groupImage.FileName;
                entity.Data = groupImage.Data;
                entity.Width = groupImage.Width;
                entity.Height = groupImage.Height;
                entity.ContentType = groupImage.ContentType;

                _context.GroupImage.Update(entity);
                _context.SaveChanges();
            }
        }
    }
}

using Microsoft.EntityFrameworkCore;
using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class UserImageService : IUserImageService
    {
        private MonAmieContext _context;

        /// <summary>
        /// 
        /// </summary>
        public UserImageService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public UserImageService(MonAmieContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add a user image to the database
        /// </summary>
        /// <param name="userImage"></param>
        public void AddUserImage(UserImage userImage)
        {
            var entity = _context.UserImage.FirstOrDefault(ui => ui.UserImageId == userImage.UserId);

            if(entity == null)
            {
                _context.UserImage.Add(userImage);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Delete a user image from the database
        /// </summary>
        /// <param name="userImage"></param>
        public void DeleteUserImage(UserImage userImage)
        {
            var entity = _context.UserImage.FirstOrDefault(ui => ui.UserImageId == userImage.UserId);

            if (entity != null)
            {
                _context.UserImage.Remove(userImage);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Gets all user images in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<UserImage> GetAllUserImages()
        {
            return _context.UserImage;
        }

        /// <summary>
        /// Gets a user image by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserImage GetById(int id)
        {
            return _context.UserImage.FirstOrDefault(ui => ui.UserImageId == id);
        }

        /// <summary>
        /// Gets a user image by its user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public UserImage GetByUserId(int userId)
        {
            return _context.UserImage.FirstOrDefault(ui => ui.UserId == userId);
        }

        /// <summary>
        /// Update a user image in the database
        /// </summary>
        /// <param name="userImage"></param>
        public void UpdateUserImage(UserImage userImage)
        {
            var entity = _context.UserImage.FirstOrDefault(ui => ui.UserId == userImage.UserId);

            if (entity != null)
            {
                _context.UserImage.Update(userImage);
                _context.SaveChanges();
            }
        }
    }
}

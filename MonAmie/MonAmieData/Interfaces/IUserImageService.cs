using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData.Interfaces
{
    public interface IUserImageService
    {
        /// <summary>
        /// Gets all user images in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<UserImage> GetAllUserImages();

        /// <summary>
        /// Gets a user image by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        UserImage GetById(int id);

        /// <summary>
        /// Gets a user image by its user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        UserImage GetByUserId(int userId);

        /// <summary>
        /// Add a user image to the database
        /// </summary>
        void AddUserImage(UserImage userImage);

        /// <summary>
        /// Delete a user image from the database
        /// </summary>
        void DeleteUserImage(UserImage userImage);

        /// <summary>
        /// Update a user image in the database
        /// </summary>
        void UpdateUserImage(UserImage userImage);
    }
}

using MonAmieData.Models;
using System;
using System.Collections.Generic;

namespace MonAmieData.Interfaces
{
    public interface IGroupImageService
    {
        /// <summary>
        /// Gets all group images in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<GroupImage> GetAllGroupImages();

        /// <summary>
        /// Gets a group image by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        GroupImage GetById(int id);

        /// <summary>
        /// Gets a group image by its group id
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        GroupImage GetByGroupId(int groupId);

        /// <summary>
        /// Add a group image to the database
        /// </summary>
        void AddGroupImage(GroupImage groupImage);

        /// <summary>
        /// Delete a group image from the database
        /// </summary>
        void DeleteGroupImage(GroupImage groupImage);

        /// <summary>
        /// Update a group image in the database
        /// </summary>
        void UpdateGroupImage(GroupImage groupImage);
    }
}

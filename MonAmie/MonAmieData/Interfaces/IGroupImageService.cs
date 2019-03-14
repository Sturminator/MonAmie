using System;
using System.Collections.Generic;
using System.Text;
using MonAmieData.Models;

namespace MonAmieData.Interfaces
{
    public interface IGroupImageService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IEnumerable<GroupImage> GetAllGroupImages();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        GroupImage GetById(int id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        GroupImage GetByGroupId(int groupId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="groupImage"></param>
        void AddGroupImage(GroupImage groupImage);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="groupImage"></param>
        void DeleteGroupImage(GroupImage groupImage);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="groupImage"></param>
        void UpdateGroupImage(GroupImage groupImage);
    }
}

using MonAmieData.Models;
using System;
using System.Collections.Generic;

namespace MonAmieData.Interfaces
{
    public interface IFriendService
    {
        /// <summary>
        /// Gets all friendships for a user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        IEnumerable<UserHasFriend> GetAllFriendshipsForUser(int id);

        /// <summary>
        /// Get a friendship by the ids
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="friendId"></param>
        /// <returns></returns>
        UserHasFriend GetFriendship(int userId, int friendId);

        /// <summary>
        /// Adds a friendship between 2 users
        /// </summary>
        /// <param name="user"></param>
        /// <param name="friend"></param>
        void AddFriendship(UserHasFriend user, UserHasFriend friend);

        /// <summary>
        /// Deletes a friendship between 2 users
        /// </summary>
        /// <param name="user"></param>
        /// <param name="friend"></param>
        void DeleteFriendship(UserHasFriend user, UserHasFriend friend);

        /// <summary>
        /// Adds a friend request to the database
        /// </summary>
        /// <param name="friendRequest"></param>
        void AddFriendRequest(UserHasFriendRequest friendRequest);

        /// <summary>
        /// Deletes a friend request from the database
        /// </summary>
        /// <param name="friendRequest"></param>
        void DeleteFriendRequest(UserHasFriendRequest friendRequest);

        /// <summary>
        /// Gets all pending friend requests for a user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        IEnumerable<UserHasFriendRequest> GetAllFriendRequestsForUser(int id);

        /// <summary>
        /// Gets all sent friend requests for a user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        IEnumerable<UserHasFriendRequest> GetAllSentFriendRequestsForUser(int id);
    }
}

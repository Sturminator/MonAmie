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
        /// <param name="userId"></param>
        /// <param name="friendId"></param>
        void AddFriendship(int userId, int friendId);

        /// <summary>
        /// Deletes a friendship between 2 users
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="friendId"></param>
        void DeleteFriendship(int userId, int friendId);

        /// <summary>
        /// Adds a friend request to the database
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="pendingId"></param>
        void AddFriendRequest(int userId, int pendingId);

        /// <summary>
        /// Deletes a friend request from the database
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="pendingId"></param>
        void DeleteFriendRequest(int userId, int pendingId);

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

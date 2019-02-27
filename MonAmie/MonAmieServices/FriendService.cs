using Microsoft.EntityFrameworkCore;
using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class FriendService : IFriendService
    {
        private MonAmieContext _context;

        public FriendService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public FriendService(MonAmieContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Adds a friend request to the database
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="pendingId"></param>
        public void AddFriendRequest(int userId, int pendingId)
        {
            var entity = _context.UserHasFriendRequest.FirstOrDefault(uhfr => (uhfr.UserId == userId && uhfr.PendingFriendId == pendingId) || (uhfr.PendingFriendId == userId && uhfr.UserId == pendingId));

            if(entity == null)
            {
                _context.UserHasFriendRequest.Add(new UserHasFriendRequest
                {
                    UserId = userId,
                    PendingFriendId = pendingId
                });

                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Adds a friendship between 2 users
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="friendId"></param>
        public void AddFriendship(int userId, int friendId)
        {
            var user = _context.UserHasFriend.FirstOrDefault(uhf => (uhf.UserId == userId && uhf.FriendId == friendId));
            var friend = _context.UserHasFriend.FirstOrDefault(uhf => (uhf.UserId == friendId && uhf.FriendId == userId));

            if (user == null && friend == null)
            {
                _context.UserHasFriend.Add(new UserHasFriend
                {
                    UserId = userId,
                    FriendId = friendId
                });
                _context.UserHasFriend.Add(new UserHasFriend
                {
                    UserId = friendId,
                    FriendId = userId
                });
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Deletes a friend request from the database
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="pendingId"></param>
        public void DeleteFriendRequest(int userId, int pendingId)
        {
            var entity = _context.UserHasFriendRequest.FirstOrDefault(uhfr => (uhfr.UserId == userId && uhfr.PendingFriendId == pendingId));

            if (entity != null)
            {
                _context.UserHasFriendRequest.Remove(entity);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Deletes a friendship between 2 users
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="friendId"></param>
        public void DeleteFriendship(int userId, int friendId)
        {
            var user = _context.UserHasFriend.FirstOrDefault(uhf => (uhf.UserId == userId && uhf.FriendId == friendId));
            var friend = _context.UserHasFriend.FirstOrDefault(uhf => (uhf.UserId == friendId && uhf.FriendId == userId));

            if(user != null && friend != null)
            {
                _context.UserHasFriend.Remove(user);
                _context.UserHasFriend.Remove(friend);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Gets all pending friend requests for a user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<UserHasFriendRequest> GetAllFriendRequestsForUser(int id)
        {
            return _context.UserHasFriendRequest.Where(uhfr => uhfr.PendingFriendId == id);
        }

        /// <summary>
        /// Gets all friendships for a user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<UserHasFriend> GetAllFriendshipsForUser(int id)
        {
            return _context.UserHasFriend.Where(uhf => uhf.UserId == id);
        }

        /// <summary>
        /// Gets all sent friend requests for a user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<UserHasFriendRequest> GetAllSentFriendRequestsForUser(int id)
        {
            return _context.UserHasFriendRequest.Where(uhfr => uhfr.UserId == id);
        }

        /// <summary>
        /// Get a friendship by the ids
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="friendId"></param>
        /// <returns></returns>
        public UserHasFriend GetFriendship(int userId, int friendId)
        {
            return _context.UserHasFriend.Single(uhf => uhf.UserId == userId && uhf.FriendId == friendId);
        }

        /// <summary>
        /// Checks if a user is friends with another user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="friendId"></param>
        /// <returns></returns>
        public bool IsFriend(int userId, int friendId)
        {
            return _context.UserHasFriend.Any(uhf => uhf.UserId == userId && uhf.FriendId == friendId);
        }
    }
}

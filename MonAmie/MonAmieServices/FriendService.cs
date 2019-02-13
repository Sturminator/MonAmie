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
        /// <param name="friendRequest"></param>
        public void AddFriendRequest(UserHasFriendRequest friendRequest)
        {
            _context.UserHasFriendRequest.Add(friendRequest);
            _context.SaveChanges();
        }

        /// <summary>
        /// Adds a friendship between 2 users
        /// </summary>
        /// <param name="user"></param>
        /// <param name="friend"></param>
        public void AddFriendship(UserHasFriend user, UserHasFriend friend)
        {
            _context.UserHasFriend.Add(user);
            _context.UserHasFriend.Add(friend);
            _context.SaveChanges();
        }

        /// <summary>
        /// Deletes a friend request from the database
        /// </summary>
        /// <param name="friendRequest"></param>
        public void DeleteFriendRequest(UserHasFriendRequest friendRequest)
        {
            _context.UserHasFriendRequest.Remove(friendRequest);
            _context.SaveChanges();
        }

        /// <summary>
        /// Deletes a friendship between 2 users
        /// </summary>
        /// <param name="user"></param>
        /// <param name="friend"></param>
        public void DeleteFriendship(UserHasFriend user, UserHasFriend friend)
        {
            _context.UserHasFriend.Remove(user);
            _context.UserHasFriend.Remove(friend);
            _context.SaveChanges();
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
    }
}

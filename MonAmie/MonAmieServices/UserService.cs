using Microsoft.EntityFrameworkCore;
using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class UserService : IUserService
    {
        private MonAmieContext _context;

        public UserService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public UserService(MonAmieContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add a new user to the database
        /// </summary>
        /// <param name="user"></param>
        public void AddUser(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

        /// <summary>
        /// Get all users stored in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<User> GetAllUsers()
        {
            return _context.User;
        }

        /// <summary>
        /// Get a user's birth date
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public DateTime GetBirthDate(int userId)
        {
            return GetById(userId).BirthDate;
        }

        /// <summary>
        /// Get a user by its id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public User GetById(int userId)
        {
            return _context.User.FirstOrDefault(u => u.UserId == userId);
        }

        /// <summary>
        /// Get a user's email
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public string GetEmail(int userId)
        {
            return GetById(userId).Email;
        }

        /// <summary>
        /// Get a user's first name
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public string GetFirstName(int userId)
        {
            return GetById(userId).FirstName;
        }

        /// <summary>
        /// Get a user's full name
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="lastInitial"></param>
        /// <returns></returns>
        public string GetFullName(int userId, bool lastInitial)
        {
            User user = GetById(userId);

            return lastInitial ? string.Format("{0} {1}", user.FirstName, user.LastName[0]) : string.Format("{0} {1}", user.FirstName, user.LastName);
        }

        /// <summary>
        /// Get a user's last name
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public string GetLastName(int userId)
        {
            return GetById(userId).LastName;
        }
    }
}

using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData.Interfaces
{
    public interface IUserService
    {
        /// <summary>
        /// Get all users stored in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<User> GetAllUsers();

        /// <summary>
        /// Get a user by its id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        User GetById(int userId);

        /// <summary>
        /// Add a new user to the database
        /// </summary>
        /// <param name="user"></param>
        void AddUser(User user);

        /// <summary>
        /// Get a user's full name
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="lastInitial"></param>
        /// <returns></returns>
        string GetFullName(int userId, bool lastInitial);

        /// <summary>
        /// Get a user's first name
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        string GetFirstName(int userId);

        /// <summary>
        /// Get a user's last name
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        string GetLastName(int userId);

        /// <summary>
        /// Get a user's birth date
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        DateTime GetBirthDate(int userId);

        /// <summary>
        /// Get a user's email
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        string GetEmail(int userId);
    }
}

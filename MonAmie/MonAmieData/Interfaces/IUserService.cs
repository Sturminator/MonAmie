using MonAmieData.Models;
using System;
using System.Collections.Generic;

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
        /// Checks if there is already a user with the specified email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool IsEmailAvailable(string email);

        /// <summary>
        /// Get a user by its id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        User GetById(int userId);

        /// <summary>
        /// Get a user by its email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        User GetByEmail(string email);

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

        /// <summary>
        /// Get a user's state
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string GetState(int id);

        /// <summary>
        /// Calculates the user's age as an int given a DateTime representing their birthdate
        /// </summary>
        /// <param name="birthDate"></param>
        /// <returns></returns>
        int CalculateUserAge(DateTime birthDate);
    }
}

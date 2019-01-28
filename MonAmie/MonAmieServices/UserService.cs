﻿using Microsoft.EntityFrameworkCore;
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
            _context.User.Add(new User {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                BirthDate = user.BirthDate,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt,
                CreationDate = user.CreationDate,
                LastLoginDate = user.LastLoginDate
            });
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
        /// Checks if there is already a user with the specified email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool IsEmailAvailable(string email)
        {
            var exists = _context.User.FirstOrDefault(u => u.Email == email);

            return exists == null;
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
        /// Get a user by its email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public User GetByEmail(string email)
        {
            return _context.User.FirstOrDefault(u => u.Email == email);

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

        /// <summary>
        /// Add a user address to the database
        /// </summary>
        /// <param name="ua"></param>
        public void AddUserAddress(UserAddress ua)
        {
            _context.UserAddress.Add(new UserAddress
            {
                UserId = ua.UserId,
                State = ua.State,
                City = ua.City
            });
            _context.SaveChanges();
        }

        /// <summary>
        /// Get all user addresses in database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<UserAddress> GetUserAddresses()
        {
            return _context.UserAddress;
        }

        /// <summary>
        /// Get a user address by that user's id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserAddress GetUserAddressByUserId(int id)
        {
            return _context.UserAddress.FirstOrDefault(ua => ua.UserId == id);
        }

        /// <summary>
        /// Get a user's state
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetState(int id)
        {
            return GetUserAddressByUserId(id).State;
        }

        /// <summary>
        /// Get a user's city
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetCity(int id)
        {
            return GetUserAddressByUserId(id).City;
        }

        /// <summary>
        /// Calculates the user's age as an int given a DateTime representing their birthdate
        /// </summary>
        /// <param name="birthDate"></param>
        /// <returns></returns>
        public int CalculateUserAge(DateTime birthDate)
        {
            var today = DateTime.Today;
            var age = today.Year - birthDate.Year;

            if (birthDate > today.AddYears(-age))
                age--;

            return age;
        }
    }
}

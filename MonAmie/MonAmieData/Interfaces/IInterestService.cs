using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData.Interfaces
{
    public interface IInterestService
    {
        /// <summary>
        /// Gets all interests stored in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<Interest> GetAllInterests();

        /// <summary>
        /// Get an interest by its id
        /// </summary>
        /// <param name="interestId"></param>
        /// <returns></returns>
        Interest GetById(int interestId);

        /// <summary>
        /// Get an interest by its name
        /// </summary>
        /// <param name="interestName"></param>
        /// <returns></returns>
        Interest GetByName(string interestName);

        /// <summary>
        /// Get all interests in a category
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        IEnumerable<Interest> GetByCategory(int categoryId);

        /// <summary>
        /// Add an interest to the database
        /// </summary>
        /// <param name="interest"></param>
        void AddInterest(Interest interest);

        /// <summary>
        /// Update an existing interest in the database
        /// </summary>
        /// <param name="interest"></param>
        void UpdateInterest(Interest interest);

        /// <summary>
        /// Delete an interest from the database
        /// </summary>
        /// <param name="interest"></param>
        void DeleteInterest(Interest interest);

        /// <summary>
        /// Gets all interests assigned to a user
        /// </summary>
        /// <returns></returns>
        IEnumerable<UserHasInterest> GetAllInterestsForUser(int userId);

        /// <summary>
        /// Add an interest to a user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="interestId"></param>
        void AddInterestToUser(int userId, int interestId);

        /// <summary>
        /// Delete an interest from a user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="interestId"></param>
        void DeleteInterestFromUser(int userId, int interestId);
    }
}

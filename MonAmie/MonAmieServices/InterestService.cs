using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class InterestService : IInterestService
    {
        private MonAmieContext _context;

        /// <summary>
        /// 
        /// </summary>
        public InterestService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public InterestService(MonAmieContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add an interest to the database
        /// </summary>
        /// <param name="interest"></param>
        public void AddInterest(Interest interest)
        {
            var entity = _context.Interest.FirstOrDefault(i => i.InterestName == interest.InterestName);

            if (entity != null)
            {
                _context.Interest.Add(interest);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Add an interest to a user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="interestId"></param>
        public void AddInterestToUser(int userId, int interestId)
        {
            var entity = _context.UserHasInterest.FirstOrDefault(ui => ui.UserId == userId && ui.InterestId == interestId);

            if(entity == null)
            {
                _context.UserHasInterest.Add(new UserHasInterest{
                    UserId = userId,
                    InterestId = interestId
                });
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Delete an interest from the database
        /// </summary>
        /// <param name="interest"></param>
        public void DeleteInterest(Interest interest)
        {
            var entity = _context.Interest.FirstOrDefault(i => i.InterestName == interest.InterestName);

            if (entity == null)
            {
                _context.Interest.Remove(interest);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Delete an interest from a user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="interestId"></param>
        public void DeleteInterestFromUser(int userId, int interestId)
        {
            var entity = _context.UserHasInterest.FirstOrDefault(ui => ui.UserId == userId && ui.InterestId == interestId);

            if (entity != null)
            {
                _context.UserHasInterest.Remove(entity);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Gets all interests stored in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Interest> GetAllInterests()
        {
            return _context.Interest;
        }

        /// <summary>
        /// Gets all interests assigned to a user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public IEnumerable<UserHasInterest> GetAllInterestsForUser(int userId)
        {
            return _context.UserHasInterest.Where(ui => ui.UserId == userId);
        }

        /// <summary>
        /// Get all interests in a category
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public IEnumerable<Interest> GetByCategory(int categoryId)
        {
            return _context.Interest.Where(i => i.CategoryId == categoryId);
        }

        /// <summary>
        /// Get an interest by its id
        /// </summary>
        /// <param name="interestId"></param>
        /// <returns></returns>
        public Interest GetById(int interestId)
        {
            return _context.Interest.FirstOrDefault(i => i.InterestId == interestId);
        }

        /// <summary>
        /// Get an interest by its name
        /// </summary>
        /// <param name="interestName"></param>
        /// <returns></returns>
        public Interest GetByName(string interestName)
        {
            return _context.Interest.FirstOrDefault(i => i.InterestName == interestName);
        }

        /// <summary>
        /// Update an existing interest in the database
        /// </summary>
        /// <param name="interest"></param>
        public void UpdateInterest(Interest interest)
        {
            var entity = _context.Interest.FirstOrDefault(i => i.InterestName == interest.InterestName);

            if (entity != null)
            {
                _context.Interest.Update(interest);
                _context.SaveChanges();
            }
        }
    }
}

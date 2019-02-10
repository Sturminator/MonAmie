using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class CategoryService : ICategoryService
    {
        private MonAmieContext _context;

        /// <summary>
        /// 
        /// </summary>
        public CategoryService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public CategoryService(MonAmieContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add a new category to the database
        /// </summary>
        /// <param name="category"></param>
        public void AddCategory(Category category)
        {
            var entity = _context.Category.FirstOrDefault(c => c.CategoryName == category.CategoryName);

            if(entity == null)
            {
                _context.Category.Add(category);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Updates an existing category in the database
        /// </summary>
        /// <param name="category"></param>
        public void UpdateCategory(Category category)
        {
            var entity = _context.Category.FirstOrDefault(c => c.CategoryId == category.CategoryId);

            if(entity != null)
            {
                _context.Category.Update(category);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Deletes a category from the database
        /// </summary>
        /// <param name="category"></param>
        public void DeleteCategory(Category category)
        {
            var entity = _context.Category.FirstOrDefault(c => c.CategoryId == category.CategoryId);

            if(entity != null)
            {
                _context.Category.Remove(category);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Get all categories stored in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Category> GetAllCategories()
        {
            return _context.Category;
        }

        /// <summary>
        /// Get all categories stored in the database that can be used for events
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Category> GetEventCategories()
        {
            return GetAllCategories().Where(cat => cat.CanEvent);
        }

        /// <summary>
        /// Get all categories stored in the database that can be used for groups
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Category> GetGroupCategories()
        {
            return GetAllCategories().Where(cat => cat.CanGroup);
        }

        /// <summary>
        /// Get all categories stored in the database that can be used for interests
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Category> GetInterestCategories()
        {
            return GetAllCategories().Where(cat => cat.CanInterest);
        }

        /// <summary>
        /// Get a category by its id
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public Category GetById(int categoryId)
        {
            return _context.Category.FirstOrDefault(cat => cat.CategoryId == categoryId);
        }   

        /// <summary>
        /// Get whether a category can be used for events
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public bool GetCanEvent(int categoryId)
        {
            return GetById(categoryId).CanEvent;
        }

        /// <summary>
        /// Get whether a category can be used for groups
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public bool GetCanGroup(int categoryId)
        {
            return GetById(categoryId).CanGroup;
        }

        /// <summary>
        /// Get whether a category can be used for interests
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public bool GetCanInterest(int categoryId)
        {
            return GetById(categoryId).CanInterest;
        }

        /// <summary>
        /// Get a category's name
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public string GetCategoryName(int categoryId)
        {
            return GetById(categoryId).CategoryName;
        }

        public IEnumerable<UserHasCategory> GetAllCategoriesForUser(int userId)
        {
            return _context.UserHasCategory.Where(ui => ui.UserId == userId);
        }

        public void AddCategoryToUser(int userId, int categoryId)
        {
            var entity = _context.UserHasCategory.FirstOrDefault(ui => ui.UserId == userId && ui.CategoryId == categoryId);

            if (entity == null)
            {
                _context.UserHasCategory.Add(new UserHasCategory
                {
                    UserId = userId,
                    CategoryId = categoryId
                });
                _context.SaveChanges();
            }
        }

        public void DeleteCategoryFromUser(int userId, int categoryId)
        {
            var entity = _context.UserHasCategory.FirstOrDefault(ui => ui.UserId == userId && ui.CategoryId == categoryId);

            if (entity != null)
            {
                _context.UserHasCategory.Remove(entity);
                _context.SaveChanges();
            }
        }
    }
}

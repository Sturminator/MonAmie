using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData.Interfaces
{
    public interface ICategoryService
    {
        /// <summary>
        /// Get all categories stored in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<Category> GetAllCategories();

        /// <summary>
        /// Get all categories stored in the database that can be used for events
        /// </summary>
        /// <returns></returns>
        IEnumerable<Category> GetEventCategories();

        /// <summary>
        /// Get all categories stored in the database that can be used for groups
        /// </summary>
        /// <returns></returns>
        IEnumerable<Category> GetGroupCategories();

        /// <summary>
        /// Get all categories stored in the database that can be used for interests
        /// </summary>
        /// <returns></returns>
        IEnumerable<Category> GetInterestCategories();

        /// <summary>
        /// Get a category by its id
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        Category GetById(int categoryId);

        /// <summary>
        /// Add a new category to the database
        /// </summary>
        /// <param name="category"></param>
        void AddCategory(Category category);

        /// <summary>
        /// Updates an existing category in the database
        /// </summary>
        /// <param name="category"></param>
        void UpdateCategory(Category category);

        /// <summary>
        /// Deletes a category from the database
        /// </summary>
        /// <param name="category"></param>
        void DeleteCategory(Category category);

        /// <summary>
        /// Get a category's name
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        string GetCategoryName(int categoryId);

        /// <summary>
        /// Get whether a category can be used for interests
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        bool GetCanInterest(int categoryId);

        /// <summary>
        /// Get whether a category can be used for groups
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        bool GetCanGroup(int categoryId);

        /// <summary>
        /// Get whether a category can be used for events
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        bool GetCanEvent(int categoryId);

    }
}

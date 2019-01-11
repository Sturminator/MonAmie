using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData
{
    public interface ICategoryService
    {
        /// <summary>
        /// Get all categories stored in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<Category> GetAllCategories();

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

using MonAmieData;
using MonAmieData.Models;
using System;
using System.Collections.Generic;

namespace MonAmieServices
{
    public class CategoryService : ICategoryService
    {
        /// <summary>
        /// Add a new category to the database
        /// </summary>
        /// <param name="newCategory"></param>
        public void Add(Category newCategory)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get all categories stored in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Category> GetAll()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get a category by its id
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public Category GetById(int categoryId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get whether a category can be used for events
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public bool GetCanEvent(int categoryId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get whether a category can be used for groups
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public bool GetCanGroup(int categoryId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get whether a category can be used for interests
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public bool GetCanInterest(int categoryId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get a category's name
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public string GetCategoryName(int categoryId)
        {
            throw new NotImplementedException();
        }
    }
}

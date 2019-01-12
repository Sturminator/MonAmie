using Microsoft.EntityFrameworkCore;
using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System;
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
            _context.Add(category);
            _context.SaveChanges();
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
    }
}

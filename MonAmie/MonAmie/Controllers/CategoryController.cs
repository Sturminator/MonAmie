﻿using Microsoft.AspNetCore.Mvc;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System.Collections.Generic;
using System.Linq;
using MonAmieData.Models;

namespace MonAmie.Controllers
{
    [ApiController]
    public class CategoryController : Controller
    {
        private ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet]
        [Route("api/Category/GetAll")]
        public IEnumerable<CategoryViewModel> GetAll()
        {
            var categories = categoryService.GetAllCategories();

            var results = categories.Select(result => new CategoryViewModel
            {
                CategoryId = result.CategoryId,
                CategoryName = result.CategoryName
            });

            return results.ToList();
        }

        [HttpGet]
        [Route("api/Category/GetAllForUser/{id}")]
        public IActionResult GetAllForUser(int id)
        {
            var userCategories = categoryService.GetAllCategoriesForUser(id);
            var categories = categoryService.GetAllCategories();

            var results = userCategories.Select(result => new CategoryViewModel
            {
                CategoryId = result.CategoryId,
                CategoryName = categories.SingleOrDefault(c => c.CategoryId == result.CategoryId).CategoryName
            });

            return Ok(results);
        }

        [HttpGet]
        [Route("api/Category/Get/{id}")]
        public CategoryViewModel Get(int id)
        {
            var category = categoryService.GetById(id);

            return new CategoryViewModel
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName
            };
        }

        [HttpPost]
        [Route("api/Category/Add")]
        public void Add(Category category)
        {
            categoryService.AddCategory(category);
        }

        [HttpPut]
        [Route("api/Category/Edit")]
        public void Update(Category category)
        {
            categoryService.UpdateCategory(category);
        }

        [HttpDelete]
        [Route("api/Category/Delete")]
        public void Delete(Category category)
        {
            categoryService.DeleteCategory(category);
        }
    }
}

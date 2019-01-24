using Microsoft.AspNetCore.Mvc;
using System.Web.Http;
using System.Net.Http;
using MonAmie.Models;
using MonAmieData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonAmieData.Models;

namespace MonAmie.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private ICategoryService _categories;

        public CategoryController(ICategoryService categories)
        {
            _categories = categories;
        }

        [HttpGet("[action]")]
        public IEnumerable<CategoryViewModel> GetAll()
        {
            var categories = _categories.GetAllCategories();

            var results = categories.Select(result => new CategoryViewModel
            {
                CategoryId = result.CategoryId,
                CategoryName = result.CategoryName,
                CanInterest = result.CanInterest,
                CanGroup = result.CanGroup,
                CanEvent = result.CanEvent
            });

            return results.ToList();
        }

        [HttpGet("[action]")]
        public CategoryViewModel Get(int id)
        {
            var category = _categories.GetById(id);

            return new CategoryViewModel
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName,
                CanInterest = category.CanInterest,
                CanGroup = category.CanGroup,
                CanEvent = category.CanEvent
            };
        }

        [HttpPost("[action]")]
        public void Add(Category category)
        {
            _categories.AddCategory(category);
        }

        [HttpPut("[action]")]
        public void Update(Category category)
        {
            _categories.UpdateCategory(category);
        }

        [HttpDelete("[action]")]
        public void Delete(Category category)
        {
            _categories.DeleteCategory(category);
        }
    }
}

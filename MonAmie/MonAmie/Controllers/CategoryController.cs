using Microsoft.AspNetCore.Mvc;
using MonAmie.Models;
using MonAmieData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonAmie.Controllers
{
    public class CategoryController : Controller
    {
        private ICategoryService _categories;

        public CategoryController(ICategoryService categories)
        {
            _categories = categories;
        }

        public IActionResult Index()
        {
            var categoryModels = _categories.GetAllCategories();

            var results = categoryModels.Select(result => new CategoryViewModel
            {
                CategoryId = result.CategoryId,
                CategoryName = result.CategoryName,
                CanInterest = result.CanInterest,
                CanGroup = result.CanGroup,
                CanEvent = result.CanEvent
            });

            return View(results.ToList());
        }
    }
}

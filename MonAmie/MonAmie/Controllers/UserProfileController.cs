using Microsoft.AspNetCore.Mvc;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System.Collections.Generic;
using System.Linq;
using MonAmieData.Models;

namespace MonAmie.Controllers
{
    [ApiController]
    public class UserProfileController : Controller
    {
        private IUserService userService;
        private ICategoryService categoryService;

        public UserProfileController(IUserService userService, ICategoryService categoryService)
        {
            this.userService = userService;
            this.categoryService = categoryService;
        }

        [HttpGet]
        [Route("api/UserProfile/GetById/{id}")]
        public IActionResult GetById(int id)
        {
            var user = userService.GetById(id);
            var userCategories = categoryService.GetAllCategoriesForUser(id);
            var categories = categoryService.GetAllCategories();

            var userCategoryModels = userCategories.Select(result => new CategoryViewModel
            {
                CategoryId = result.CategoryId,
                CategoryName = categories.SingleOrDefault(c => c.CategoryId == result.CategoryId).CategoryName
            });

            if (user == null)
                return BadRequest(new { message = "Could not retrieve profile for user." });

            return Ok(new
            {
                Id = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                FullName = user.FirstName + " " + user.LastName,
                Gender = user.Gender,
                Age = userService.CalculateUserAge(user.BirthDate),
                State = user.State,
                Bio = user.Bio,
                Categories = userCategoryModels.ToList()
            });
        }
    }
}

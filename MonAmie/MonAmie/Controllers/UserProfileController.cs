using Microsoft.AspNetCore.Mvc;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System.Collections.Generic;
using System.Linq;
using MonAmieData.Models;
using MonAmie.Dtos;

namespace MonAmie.Controllers
{
    [ApiController]
    public class UserProfileController : Controller
    {
        private IUserService userService;
        private ICategoryService categoryService;
        private IFriendService friendService;

        public UserProfileController(IUserService userService, ICategoryService categoryService, IFriendService friendService)
        {
            this.userService = userService;
            this.categoryService = categoryService;
            this.friendService = friendService;
        }

        [HttpGet]
        [Route("profile/api/UserProfile/GetById/{id}/{loggedInId}")]
        public IActionResult GetById(int id, int loggedInId)
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

            var isFriend = friendService.IsFriend(loggedInId, id);

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
                Categories = userCategoryModels.ToList().OrderBy(ucm => ucm.CategoryName),
                isFriend = isFriend
            });
        }

        [HttpPut]
        [Route("profile/api/UserProfile/Update")]
        public IActionResult Update([FromBody]UserDto userDto)
        {
            var bio = userDto.Bio;
            var id = userDto.Id;

            if(bio == null)
            {
                return BadRequest(new { message = "Bio cannot be null." });
            }

            var updatedUser = userService.UpdateUserBio(id, bio);

            return Ok(new
            {
                Id = updatedUser.UserId,
                FirstName = updatedUser.FirstName,
                LastName = updatedUser.LastName,
                FullName = updatedUser.FirstName + " " + updatedUser.LastName,
                Gender = updatedUser.Gender,
                Age = userService.CalculateUserAge(updatedUser.BirthDate),
                State = updatedUser.State,
                Bio = updatedUser.Bio,
                Categories = userDto.Categories
            });
        }

        [HttpPut]
        [Route("profile/api/UserProfile/UpdateCategories")]
        public IActionResult UpdateCategories([FromBody]UserDto userDto)
        {
            var newCategories = userDto.Categories;
            var id = userDto.Id;

            var userCategories = categoryService.GetAllCategoriesForUser(id);
            var categories = categoryService.GetAllCategories();

            var userCategoryModels = userCategories.Select(userCat => new Category
            {
                CategoryId = userCat.CategoryId,
                CategoryName = categories.SingleOrDefault(c => c.CategoryId == userCat.CategoryId).CategoryName
            }).ToList();

            var toRemove = userCategoryModels.Where(ucm => !newCategories.Any(cat => cat.CategoryId == ucm.CategoryId)).ToList();

            var toAdd = newCategories.Where(cat => !userCategoryModels.Any(ucm => ucm.CategoryId == cat.CategoryId)).ToList();

            foreach(var cat in toRemove)
            {
                categoryService.DeleteCategoryFromUser(id, cat.CategoryId);
            }

            foreach(var cat in toAdd)
            {
                categoryService.AddCategoryToUser(id, cat.CategoryId);
            }

            var user = userService.GetById(id);

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
                Categories = newCategories
            });
        }
    }
}

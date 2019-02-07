using Microsoft.AspNetCore.Mvc;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonAmie.Controllers
{
    [ApiController]
    public class InterestController
    {
        private IInterestService interestService;
        private ICategoryService categoryService;

        public InterestController(IInterestService interestService, ICategoryService categoryService)
        {
            this.interestService = interestService;
            this.categoryService = categoryService;
        }

        [HttpGet]
        [Route("api/Interest/GetAll")]
        public IEnumerable<InterestViewModel> GetAll()
        {
            var interests = interestService.GetAllInterests();
            var categories = categoryService.GetAllCategories();

            var results = interests.Select(result => new InterestViewModel
            {
                InterestId = result.InterestId,
                CategoryId = result.CategoryId,
                InterestName = result.InterestName,
                CategoryName = categories.SingleOrDefault(c => c.CategoryId == result.CategoryId).CategoryName
            });

            return results.ToList();
        }

        [HttpGet]
        [Route("api/Interest/GetAllForUser/{id}")]
        public IEnumerable<InterestViewModel> GetAllForUser(int id)
        {
            var interests = interestService.GetAllInterests();
            var userInterests = interestService.GetAllInterestsForUser(id);
            var categories = categoryService.GetAllCategories();

            var results = userInterests.Select(result => new InterestViewModel
            {
                InterestId = result.InterestId,
                CategoryId = interests.SingleOrDefault(i => i.InterestId == result.InterestId).CategoryId,
                InterestName = interests.SingleOrDefault(i => i.InterestId == result.InterestId).InterestName,
                CategoryName = categories.SingleOrDefault(c => c.CategoryId == interests.SingleOrDefault(i => i.InterestId == result.InterestId).CategoryId).CategoryName
            });

            return results.ToList();
        }
    }
}

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;
using MonAmieData.Interfaces;
using MonAmieServices;
using MonAmieData;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieTests.ServiceTests
{
    [TestClass]
    public class CategoryTests
    {
        public Category CreateCategory()
        {   
            Category category = new Category()
            {
                CategoryId = 1,
                CategoryName = "Sports",
                CanEvent = true,
                CanGroup = true,
                CanInterest = true
            };

            return category;
        }

        [TestMethod]
        public void GetCategories()
        {
            var dbOptionsBuilder = new DbContextOptionsBuilder<MonAmieContext>()
                .UseInMemoryDatabase(databaseName: "GetCategories");

            var db = new MonAmieContext(dbOptionsBuilder.Options);

            ICategoryService cs = new CategoryService(db);

            Category category = CreateCategory();

            cs.AddCategory(category);

            IEnumerable<Category> categories = cs.GetAllCategories().ToList();

            Assert.IsNotNull(categories);
            Assert.AreEqual("Sports", categories.First().CategoryName);
        }
    }
}

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;
using MonAmieData.Interfaces;
using MonAmieServices;
using MonAmieData;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieTests.Models
{
    [TestClass]
    public class CategoryTests
    {

        [TestMethod]
        public void AddCategory()
        {   
            Category category = new Category()
            {
                CategoryId = 1,
                CategoryName = "Sports",
                CanEvent = true,
                CanGroup = true,
                CanInterest = true
            };

            Assert.IsNotNull(category);
            Assert.AreEqual("Sports", category.CategoryName);
        }

        [DataTestMethod]
        public void GetCategories()
        {
            var dbOptionsBuilder = new DbContextOptionsBuilder().UseSqlServer("Data Source=SQL5006.site4now.net;Initial Catalog=DB_A38FB2_MonAmie;User Id=DB_A38FB2_MonAmie_admin;Password=Raeder130583;");

            var db = new MonAmieContext(dbOptionsBuilder.Options);

            ICategoryService cs = new CategoryService(db);

            IEnumerable<Category> categories = cs.GetAllCategories().ToList();

            Assert.IsNotNull(categories);
            Assert.AreEqual("Sports", categories.First().CategoryName);
        }
    }
}

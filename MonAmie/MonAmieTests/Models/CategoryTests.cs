using Microsoft.VisualStudio.TestTools.UnitTesting;
using MonAmieData.Models;
using MonAmieData.Interfaces;

namespace MonAmieTests
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

            Assert.AreEqual("Sports", category.CategoryName);
        }
    }
}

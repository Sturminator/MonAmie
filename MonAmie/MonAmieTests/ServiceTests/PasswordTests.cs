using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;
using MonAmieData.Interfaces;
using MonAmieServices;
using MonAmieData;
using Microsoft.Data.Sqlite;
using System;

namespace MonAmieTests.ServiceTests
{
    [TestClass]
    public class PasswordTests
    {
        public User CreateUser(string hashedPwd, string salt)
        {
            User user = new User()
            {
                UserId = 1,
                FirstName = "John",
                LastName = "Smith",
                BirthDate = DateTime.Now.AddYears(-21),
                Email = "johnsmith@gmail.com",
                PhoneNumber = "5423415923",
                PasswordHash = hashedPwd,
                PasswordSalt = salt,
                CreationDate = DateTime.Now,
                LastLoginDate = DateTime.Now
            };

            return user;
        }

        [TestMethod]
        public void CreateSalt()
        {
            IPasswordService ps = new PasswordService();

            string salt = ps.CreateSalt(16);

            Assert.IsNotNull(salt);
        }

        [TestMethod]
        public void GenerateHashedPassword()
        {
            IPasswordService ps = new PasswordService();

            string salt = ps.CreateSalt(16);
            string pwd = "Admin123";

            string hashedPwd = ps.GenerateSHA256Hash(pwd, salt);
            string hashedPwd2 = ps.GenerateSHA256Hash(pwd, salt);

            Assert.IsNotNull(hashedPwd);
            Assert.IsNotNull(hashedPwd2);
            Assert.AreEqual(hashedPwd, hashedPwd2);
        }

        [TestMethod]
        public void SamePasswordDifferentSalts()
        {
            IPasswordService ps = new PasswordService();

            string salt = ps.CreateSalt(16);
            string salt2 = ps.CreateSalt(16);
            string pwd = "Admin123";

            string hashedPwd = ps.GenerateSHA256Hash(pwd, salt);
            string hashedPwd2 = ps.GenerateSHA256Hash(pwd, salt2);

            Assert.IsNotNull(hashedPwd);
            Assert.IsNotNull(hashedPwd2);
            Assert.AreNotEqual(hashedPwd, hashedPwd2);
        }

        [TestMethod]
        public void SameSaltDifferentPasswords()
        {
            IPasswordService ps = new PasswordService();

            string salt = ps.CreateSalt(16);
            string pwd = "Admin123";
            string pwd2 = "123Admin";

            string hashedPwd = ps.GenerateSHA256Hash(pwd, salt);
            string hashedPwd2 = ps.GenerateSHA256Hash(pwd2, salt);

            Assert.IsNotNull(hashedPwd);
            Assert.IsNotNull(hashedPwd2);
            Assert.AreNotEqual(hashedPwd, hashedPwd2);
        }

        [TestMethod]
        public void LoginValidation()
        {
            var dbOptionsBuilder = new DbContextOptionsBuilder<MonAmieContext>()
                .UseInMemoryDatabase(databaseName: "LoginValidation");

            var db = new MonAmieContext(dbOptionsBuilder.Options);

            IUserService us = new UserService(db);
            IPasswordService ps = new PasswordService();

            string salt = ps.CreateSalt(16);
            string pwd = "Jsmith123";
            string hashedPwd = ps.GenerateSHA256Hash(pwd, salt);

            User user = CreateUser(hashedPwd, salt);

            us.AddUser(user);

            User returnedUser = us.GetByEmail("johnsmith@gmail.com");

            string pwdEntered = "Jsmith123";
            string returnedHashedPwd = ps.GenerateSHA256Hash(pwdEntered, returnedUser.PasswordSalt);

            Assert.IsNotNull(returnedUser);
            Assert.AreEqual("John", returnedUser.FirstName);
            Assert.AreEqual("Smith", returnedUser.LastName);
            Assert.AreEqual(returnedHashedPwd, returnedUser.PasswordHash);
        }
    }
}

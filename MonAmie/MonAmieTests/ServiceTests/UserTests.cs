using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;
using MonAmieData.Interfaces;
using MonAmieServices;
using MonAmieData;
using System.Collections.Generic;
using System.Linq;
using System;

namespace MonAmieTests.ServiceTests
{
    [TestClass]
    public class UserTests
    {
        [TestMethod]
        public void AddUser()
        {
            IPasswordService ps = new PasswordService();

            string salt = ps.CreateSalt(16);
            string pwd = "Jsmith123";

            string hashedPwd = ps.GenerateSHA256Hash(pwd, salt);

            User user = new User()
            {
                UserId = 1,
                FirstName = "John",
                LastName = "Smith",
                BirthDate = DateTime.Now.AddYears(-21),
                Email = "johnsmith@gmail.com",
                PasswordHash = hashedPwd,
                PasswordSalt = salt,
                CreationDate = DateTime.Now,
                LastLoginDate = DateTime.Now
            };

            bool passwordsAreEqual = PasswordsAreEqual(user);

            Assert.IsNotNull(user);
            Assert.IsTrue(passwordsAreEqual);
            Assert.AreEqual(user.BirthDate.ToString(), user.CreationDate.AddYears(-21).ToString());
            Assert.AreEqual("John Smith", user.FirstName + " " + user.LastName);
        }

        public bool PasswordsAreEqual(User user)
        {
            IPasswordService ps = new PasswordService();

            string pwdEntered = "Jsmith123";

            string hashedPwd = ps.GenerateSHA256Hash(pwdEntered, user.PasswordSalt);

            return hashedPwd == user.PasswordHash;
        }
    }
}

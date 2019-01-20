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
    public class PasswordTests
    {
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

        [DataTestMethod]
        public void LoginValidation()
        {
            var dbOptionsBuilder = new DbContextOptionsBuilder().UseSqlServer("Data Source=SQL5006.site4now.net;Initial Catalog=DB_A38FB2_MonAmie;User Id=DB_A38FB2_MonAmie_admin;Password=Raeder130583;");

            var db = new MonAmieContext(dbOptionsBuilder.Options);

            IUserService us = new UserService(db);

            User user = us.GetByEmail("johnsmith@gmail.com");

            IPasswordService ps = new PasswordService();
            string pwdEntered = "Jsmith123";
            string hashedPwd = ps.GenerateSHA256Hash(pwdEntered, user.PasswordSalt);

            Assert.IsNotNull(user);
            Assert.AreEqual("John", user.FirstName);
            Assert.AreEqual("Smith", user.LastName);
            Assert.AreEqual(hashedPwd, user.PasswordHash);
        }
    }
}

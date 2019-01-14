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

            string salt = ps.CreateSalt(10);

            Assert.IsNotNull(salt);
        }

        [TestMethod]
        public void GenerateHashedPassword()
        {
            IPasswordService ps = new PasswordService();

            string salt = ps.CreateSalt(10);
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

            string salt = ps.CreateSalt(10);
            string salt2 = ps.CreateSalt(10);
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

            string salt = ps.CreateSalt(10);
            string pwd = "Admin123";
            string pwd2 = "123Admin";

            string hashedPwd = ps.GenerateSHA256Hash(pwd, salt);
            string hashedPwd2 = ps.GenerateSHA256Hash(pwd2, salt);

            Assert.IsNotNull(hashedPwd);
            Assert.IsNotNull(hashedPwd2);
            Assert.AreNotEqual(hashedPwd, hashedPwd2);
        }
    }
}

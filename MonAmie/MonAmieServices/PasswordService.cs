using MonAmieData.Interfaces;
using System;
using System.Text;

namespace MonAmieServices
{
    public class PasswordService : IPasswordService
    {
        /// <summary>
        /// 
        /// </summary>
        public PasswordService()
        {

        }

        /// <summary>
        /// Generates a random salt
        /// </summary>
        /// <param name="size"></param>
        public string CreateSalt(int size)
        {
            var rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
            var buff = new byte[size];
            rng.GetBytes(buff);

            return Convert.ToBase64String(buff);
        }

        /// <summary>
        /// Generates hash from user input and random salt
        /// </summary>
        /// <param name="input"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        public string GenerateSHA256Hash(string input, string salt)
        {
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(input + salt);
            System.Security.Cryptography.SHA256Managed sha256hashstring =
                new System.Security.Cryptography.SHA256Managed();
            byte[] hash = sha256hashstring.ComputeHash(bytes);

            return ByteArrayToHexString(hash);
        }

        /// <summary>
        /// Converts a byte array to a hex string
        /// </summary>
        /// <param name="byteArray"></param>
        /// <returns></returns>
        public string ByteArrayToHexString(byte[] byteArray)
        {
            StringBuilder hex = new StringBuilder(byteArray.Length * 2);

            foreach (byte b in byteArray)
                hex.AppendFormat("{0:x2}", b);

            return hex.ToString();
        }
    }
}

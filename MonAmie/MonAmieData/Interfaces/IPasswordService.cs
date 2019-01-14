using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData.Interfaces
{
    public interface IPasswordService
    {
        /// <summary>
        /// Generates a random salt
        /// </summary>
        /// <returns></returns>
        string CreateSalt(int size);

        /// <summary>
        /// Generates hash from user input and random salt
        /// </summary>
        /// <param name="input"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        string GenerateSHA256Hash(string input, string salt);

        /// <summary>
        /// Converts a byte array to a hex string
        /// </summary>
        /// <param name="byteArray"></param>
        /// <returns></returns>
        string ByteArrayToHexString(byte[] byteArray);
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using MonAmieData.Models;
using System;
using System.Collections.Generic;

namespace MonAmieData.Interfaces
{
    public interface IZipService
    {
        /// <summary>
        /// Get all zipcodes stored in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<ZIP_Codes> GetAllUsers();


        /// <summary>
        /// gets the city infromation by zipcode
        /// </summary>
        /// <param name="zipCode"></param>
        /// <returns></returns>
        ZIP_Codes GetByZip(int zipCode);


        /// <summary>
        /// gets the state name by state code
        /// </summary>
        /// <param name="stateCode"></param>
        /// <returns></returns>
        States GetByStateCode(int stateCode);


        /// <summary>
        /// returns the name of the city and state in a string
        /// </summary>
        /// <param name="zipCode"></param>
        /// <returns></returns>
        string getCityAndState(int zipCode);

    }
}

using MonAmieData;
using MonAmieData.Interfaces;
using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MonAmieServices
{
    public class ZipService : IZipService
    {
        private ZipContext _context;

        public ZipService()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public ZipService(ZipContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all zipcodes stored in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ZIP_Codes> GetAllUsers()
        {
            return _context.ZIP_Codes;
        }


        /// <summary>
        /// gets the city infromation by zipcode
        /// </summary>
        /// <param name="zipCode"></param>
        /// <returns></returns>
        public ZIP_Codes GetByZip(int zipCode)
        {
            return _context.ZIP_Codes.FirstOrDefault(u => u.ZIPCode == zipCode);
        }


        /// <summary>
        /// gets the state name by state code
        /// </summary>
        /// <param name="stateCode"></param>
        /// <returns></returns>
        public States GetByStateCode(int stateCode)
        {
            return _context.States.FirstOrDefault(u => u.StateCode == stateCode);
        }


        /// <summary>
        /// returns the name of the city and state in a string
        /// </summary>
        /// <param name="zipCode"></param>
        /// <returns></returns>
        public string getCityandState(int zipCode)
        {
            string city = GetByZip(zipCode).City;

            int stateCode = GetByZip(zipCode).State_Code;

            string state = GetByStateCode(stateCode).StateName;

            return city + ", " + state;
        }
    }
}

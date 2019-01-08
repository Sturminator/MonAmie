using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData.Models
{
    public class UserAddress
    {
        public int UserAddressId { get; set; }
        public int UserId { get; set; }
        public string City { get; set; }
        public string StatePr { get; set; }
        public string Country { get; set; }
    }
}

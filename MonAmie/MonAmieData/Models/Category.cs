using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public bool CanInterest { get; set; }
        public bool CanGroup { get; set; }
        public bool CanEvent { get; set; }
    }
}

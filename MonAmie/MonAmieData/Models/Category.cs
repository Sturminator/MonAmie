using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MonAmieData.Models
{
    public class Category
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string CategoryName { get; set; }

        [Required]
        public bool CanInterest { get; set; }

        [Required]
        public bool CanGroup { get; set; }

        [Required]
        public bool CanEvent { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class Category
    {
        [Required]        
        public int CategoryId { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string CategoryName { get; set; }

        [Required]
        public bool CanInterest { get; set; }

        [Required]
        public bool CanGroup { get; set; }

        [Required]
        public bool CanEvent { get; set; }
    }
}

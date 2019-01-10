using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class Interest
    {
        [Required]
        public int InterestId { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string InterestName { get; set; }

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}

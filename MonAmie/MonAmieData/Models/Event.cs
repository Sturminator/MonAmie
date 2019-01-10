using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class Event
    {
        [Required]
        public int EventId { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string EventName { get; set; }

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}

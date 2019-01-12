using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class Group
    {
        [Required]
        public int GroupId { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string GroupName { get; set; }

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime CreationDate { get; set; }
    }
}

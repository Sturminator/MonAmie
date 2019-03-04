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
        [Column(TypeName = "varchar(50)")]
        public string GroupName { get; set; }

        [Required]
        [Column(TypeName = "varchar(500)")]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int OwnerId { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime CreationDate { get; set; }

        public virtual User Owner { get; set; }
        public virtual Category Category { get; set; }
    }
}

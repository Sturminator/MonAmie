using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class GroupHasActivity
    {
        [Required]
        public int GroupHasActivityId { get; set; }

        [Required]
        public int GroupId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [Column(TypeName = "varchar(25)")]
        public string Type { get; set; }

        [Column(TypeName = "varchar(500)")]
        public string NewVal { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime CreationDate { get; set; }

        public virtual User User { get; set; }
        public virtual Group Group { get; set; }
    }
}

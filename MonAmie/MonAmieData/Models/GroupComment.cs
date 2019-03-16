using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class GroupComment
    {
        [Required]
        public int GroupCommentId { get; set; }

        [Required]
        public int GroupId { get; set; }

        [Required]
        public int UserId { get; set; }

        public int? ParentId { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string Comment { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime PostDate { get; set; }

        public virtual User User { get; set; }
        public virtual Group Group { get; set; }
    }
}

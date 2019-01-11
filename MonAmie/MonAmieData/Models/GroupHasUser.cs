using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class GroupHasUser
    {
        [Required]
        public int GroupHasUserId { get; set; }

        [Required]
        [ForeignKey("Group")]
        public int GroupId { get; set; }
        public Group Group { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime JoinDate { get; set; }
    }
}

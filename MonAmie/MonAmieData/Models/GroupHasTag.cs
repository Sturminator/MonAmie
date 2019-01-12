using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class GroupHasTag
    {
        [Required]
        public int GroupHasTagId { get; set; }

        [Required]
        [ForeignKey("Group")]
        public int GroupId { get; set; }
        public Group Group { get; set; }
        
        [Required]
        [ForeignKey("Tag")]
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}

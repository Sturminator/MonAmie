using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class Tag
    {
        [Required]
        public int TagId { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string TagName { get; set; }

    }
}

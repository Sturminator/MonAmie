using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class GroupImage
    {
        [Required]
        public int GroupImageId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(200)")]
        public String FileName { get; set; }

        [Required]
        [Column(TypeName = "varbinary(MAX)")]
        public byte[] Data { get; set; }

        [Required]
        public int Length { get; set; }

        [Required]
        public int Height { get; set; }

        [Required]
        public int Width { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string ContentType { get; set; }

        [Required]
        [ForeignKey("Group")]
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}

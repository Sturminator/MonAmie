using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class User
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string FirstName { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string LastName { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime BirthDate { get; set; }

        [Required]
        [Column(TypeName = "varchar(25)")]
        public string Gender { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string PasswordHash { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string PasswordSalt { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime CreationDate { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? LastLoginDate { get; set; }
    }
}

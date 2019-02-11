using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class States
    {
        [Required]
        public int StateCode { get; }

        [Required]
        [Column(TypeName = "varchar(25)")]
        public string StateAbbreviation { get; }

        [Required]
        [Column(TypeName = "varchar(25)")]
        public string StateName { get; }
    }
}

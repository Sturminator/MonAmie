using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MonAmieData.Models
{
    public class ZIP_Codes
    {
        [Required]
        public int State_Code { get; }

        [Required]
        public int ZIPCode { get; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string City { get; }
    }
}

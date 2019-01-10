using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class UserAddress
    {
        [Required]
        public int UserAddressId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string City { get; set; }

        [Required]
        [Column(TypeName = "varchar(25)")]
        public string State { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class UserHasInterest
    {
        [Required]
        public int UserHasInterestId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey("Interest")]
        public int InterestId { get; set; }
        public Interest Interest { get; set; }
    }
}

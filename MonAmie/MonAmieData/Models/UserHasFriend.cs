using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class UserHasFriend
    {
        [Required]
        public int UserHasFriendId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int FriendId { get; set; }

        public virtual User User { get; set; }
        public virtual User Friend { get; set; }
    }
}

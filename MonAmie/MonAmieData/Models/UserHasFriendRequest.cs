using System.ComponentModel.DataAnnotations;

namespace MonAmieData.Models
{
    public class UserHasFriendRequest
    {
        [Required]
        public int UserHasFriendRequestId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int PendingFriendId { get; set; }

        public virtual User User { get; set; }
        public virtual User PendingFriend { get; set; }
    }
}

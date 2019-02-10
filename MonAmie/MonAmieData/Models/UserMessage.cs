using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonAmieData.Models
{
    public class UserMessage
    {
        [Required]
        public int UserMessageId { get; set; }

        [Required]
        [Column(TypeName = "varchar(MAX)")]
        public string Content { get; set; }

        [Required]
        public int MessageSenderId { get; set; }

        [Required]
        public int MessageRecipientId { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime SentDate { get; set; }

        public virtual User MessageRecipient { get; set; }
        public virtual User MessageSender { get; set; }
    }
}

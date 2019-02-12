using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;

namespace MonAmieData
{
    public class MonAmieContext : DbContext
    {
        public MonAmieContext(DbContextOptions<MonAmieContext> options) : base(options) { }

        public DbSet<User> User { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Interest> Interest { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<GroupHasUser> GroupHasUser { get; set; }
        public DbSet<GroupHasTag> GroupHasTag { get; set; }
        public DbSet<UserHasInterest> UserHasInterest { get; set; }
        public DbSet<UserHasCategory> UserHasCategory { get; set; }
        public DbSet<UserImage> UserImage { get; set; }      
        public DbSet<UserMessage> UserMessage { get; set; }
        public DbSet<UserHasFriend> UserHasFriend { get; set; }
        public DbSet <UserHasFriendRequest> UserHasFriendRequest { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserMessage>().HasKey(um => new { um.MessageSenderId, um.MessageRecipientId });

            modelBuilder.Entity<UserMessage>()
                .HasOne(um => um.MessageSender)
                .WithMany()
                .HasForeignKey(um => um.MessageSenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserMessage>()
                .HasOne(um => um.MessageRecipient)
                .WithMany()
                .HasForeignKey(um => um.MessageRecipientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserHasFriend>().HasKey(uhf => new { uhf.UserId, uhf.FriendId });

            modelBuilder.Entity<UserHasFriend>()
                .HasOne(uhf => uhf.User)
                .WithMany()
                .HasForeignKey(uhf => uhf.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserHasFriend>()
                .HasOne(uhf => uhf.Friend)
                .WithMany()
                .HasForeignKey(uhf => uhf.FriendId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserHasFriendRequest>().HasKey(uhfr => new { uhfr.UserId, uhfr.PendingFriendId });

            modelBuilder.Entity<UserHasFriendRequest>()
                .HasOne(uhfr => uhfr.User)
                .WithMany()
                .HasForeignKey(uhfr => uhfr.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserHasFriendRequest>()
                .HasOne(uhfr => uhfr.PendingFriend)
                .WithMany()
                .HasForeignKey(uhfr => uhfr.PendingFriendId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

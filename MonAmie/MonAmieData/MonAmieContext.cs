using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public DbSet<GroupHasUser> GroupHasUser { get; set; }
        public DbSet<GroupHasActivity> GroupHasActivity { get; set; }
        public DbSet<UserHasInterest> UserHasInterest { get; set; }
        public DbSet<UserHasCategory> UserHasCategory { get; set; }
        public DbSet<UserImage> UserImage { get; set; }      
        public DbSet<UserMessage> UserMessage { get; set; }
        public DbSet<UserHasFriend> UserHasFriend { get; set; }
        public DbSet<UserHasFriendRequest> UserHasFriendRequest { get; set; }
        public DbSet<GroupImage> GroupImage { get; set; }
        public DbSet<GroupComment> GroupComment { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

            modelBuilder.Entity<Group>()
                .HasOne(g => g.Category)
                .WithMany()
                .HasForeignKey(g => g.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Group>()
                .HasOne(g => g.Owner)
                .WithMany()
                .HasForeignKey(g => g.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GroupHasActivity>()
                .HasOne(g => g.Group)
                .WithMany()
                .HasForeignKey(g => g.GroupId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GroupHasActivity>()
                .HasOne(g => g.User)
                .WithMany()
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GroupComment>()
                .HasOne(g => g.Group)
                .WithMany()
                .HasForeignKey(g => g.GroupId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GroupComment>()
                .HasOne(g => g.User)
                .WithMany()
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}


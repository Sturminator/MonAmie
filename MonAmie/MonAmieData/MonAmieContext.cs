using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;

namespace MonAmieData
{
    public class MonAmieContext : DbContext
    {
        public MonAmieContext(DbContextOptions<MonAmieContext> options) : base(options) { }

        public DbSet<User> User { get; set; }
        public DbSet<UserAddress> UserAddress { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Interest> Interest { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<GroupHasUser> GroupHasUser { get; set; }
        public DbSet<GroupHasTag> GroupHasTag { get; set; }
    }
}

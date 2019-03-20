using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;

namespace MonAmieData
{   
    /// <summary>
    /// Not used in current version of software
    /// was intended to be used to narrow match results for users to city via and not just state
    /// Zipcodes do contain their own MS SQL DB
    /// </summary>
    public class ZipContext : DbContext
    {
        public ZipContext(DbContextOptions<ZipContext> options) : base(options) { }

        public DbSet<States> States { get; }
        public DbSet<ZIP_Codes> ZIP_Codes{ get; }
    }
}

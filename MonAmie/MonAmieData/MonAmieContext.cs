using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;

namespace MonAmieData
{
    public class MonAmieContext : DbContext
    {
        public MonAmieContext(DbContextOptions options) : base(options) { }
    }
}

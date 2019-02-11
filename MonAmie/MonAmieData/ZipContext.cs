using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MonAmieData.Models;

namespace MonAmieData
{
    class ZipContext : DbContext
    {
        public ZipContext(DbContextOptions<ZipContext> options) : base(options) { }

        public DbSet<States> States { get; }
        public DbSet<ZIP_Codes> ZIP_Codes{ get; }
    }
}

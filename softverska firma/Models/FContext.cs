
using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class FContext : DbContext
    {
        public DbSet<Firma> Firme { get; set; }

        public DbSet<Projekat> Projekti { get; set; }

        public DbSet<Programer> Programeri { get; set; }

        public FContext(DbContextOptions options) : base(options)
        {

        }
    }
}
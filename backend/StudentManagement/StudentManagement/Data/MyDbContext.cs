using Microsoft.EntityFrameworkCore;
using StudentManagement.Models;

namespace StudentManagement.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) :base(options)
        {

        }

        public DbSet<Student> student { get; set; }
        public DbSet<Placement> placement { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;

namespace StudentManagement.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) :base(options)
        {

        }

        public DbSet<Student> student { get; set; }

    }
}

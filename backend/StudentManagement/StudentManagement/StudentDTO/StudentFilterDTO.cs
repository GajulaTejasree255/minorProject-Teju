using Microsoft.EntityFrameworkCore;

namespace StudentManagement.StudentDTO
{
    [Keyless]
    public class StudentFilterDTO
    {
        public int? RollNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Department { get; set; }
    }
}

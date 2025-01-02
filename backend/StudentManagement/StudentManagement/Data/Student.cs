using Microsoft.EntityFrameworkCore;

namespace StudentManagement.Data
{
    [Keyless]
    public class Student
    {
        public int? Id { get; set; }
        public int? RollNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Department { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? PlacementStatus { get; set; }

    }
}

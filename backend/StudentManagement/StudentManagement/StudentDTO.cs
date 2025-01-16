using System.ComponentModel.DataAnnotations;

namespace StudentManagement
{
    public class StudentDTO
    {
        public int? RollNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Department { get; set; }
        public string? Email { get; set; }
        public int? PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? PlacementStatus { get; set; }
    }
}

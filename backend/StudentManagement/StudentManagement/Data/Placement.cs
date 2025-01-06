using StudentManagement.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentManagement.Models
{
    public class Placement
    {
        [Key]
        public int ID { get; set; } // Primary Key

        [ForeignKey("Student")]
        public int RollNumber { get; set; } // Foreign Key

        public Student Student { get; set; } // Navigation property

        public string? CompanyName { get; set; }
        public string? JobRole { get; set; }
        public int? CtcOffered { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string? Location { get; set; }
        public string? SelectionProcess { get; set; }
        public string? QuestionsAsked { get; set; }
    }
}

using Microsoft.AspNetCore.Mvc;
using StudentManagement.Data;
using StudentManagement.StudentDTO;

namespace StudentManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly ILogger<StudentController> _logger;
        private readonly MyDbContext _context;

        public StudentController(ILogger<StudentController> logger, MyDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("students")]
        public ActionResult<IEnumerable<Student>> GetStudentDetails()
        {
            try
            {
                var students = _context.student.ToList();
                if (!students.Any())
                {
                    _logger.LogWarning("No students found in the database.");
                    return NotFound("No students found.");
                }

                return Ok(students);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching student details.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("GetStudents")]
        [Produces("application/json")]
        public ActionResult<IEnumerable<StudentFilterDTO>> GetStudents([FromQuery] StudentFilterDTO student)
        {
            try
            {

                Console.WriteLine("Starting execution of GetStudents");
                Console.WriteLine($"RollNumber: {student?.RollNumber}, FirstName: {student?.FirstName}, LastName: {student?.LastName}, Department: {student?.Department}");

                if (!student.RollNumber.HasValue &&
                    string.IsNullOrEmpty(student.FirstName) &&
                    string.IsNullOrEmpty(student.LastName) &&
                    string.IsNullOrEmpty(student.Department))
                {
                   
                    var allStudents = _context.student.ToList();

                    if (!allStudents.Any())
                    {
                        _logger.LogWarning("No students found in the database.");
                        return NotFound("No students found.");
                    }

                    return Ok(allStudents);
                }
                
                var query = _context.student.AsQueryable();

                if (student.RollNumber.HasValue)
                {
                    query = query.Where(s => s.RollNumber == student.RollNumber.Value);
                }

                if (!string.IsNullOrEmpty(student.FirstName))
                {
                    query = query.Where(s => s.FirstName.Contains(student.FirstName));
                }

                if (!string.IsNullOrEmpty(student.LastName))
                {
                    query = query.Where(s => s.LastName.Contains(student.LastName));
                }

                if (!string.IsNullOrEmpty(student.Department))
                {
                    query = query.Where(s => s.Department.Contains(student.Department));
                }

                var filteredStudents = query.ToList();

                if (!filteredStudents.Any())
                {
                    _logger.LogWarning("No matching students found.");
                    return NotFound("No matching students found with the provided details.");
                }

                return Ok(filteredStudents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching student details.");
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}

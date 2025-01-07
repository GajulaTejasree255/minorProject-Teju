using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagement.Data;

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
        public ActionResult<IEnumerable<Student>> GetStudents([FromQuery] StudentDTO student)
        {
            try
            {
                string baseSql = "SELECT * FROM student WHERE 1=1";  // Start with a valid base query
                List<object> parameters = new List<object>();  // Store the filter parameters
                int parameterIndex = 0; // Keep track of the parameter index for placeholders

                // Add filter for RollNumber if provided
                if (student.RollNumber.HasValue)
                {
                    baseSql += " AND RollNumber = {" + parameterIndex++ + "}";
                    parameters.Add(student.RollNumber.Value);
                }

                // Add filter for FirstName if provided
                if (!string.IsNullOrEmpty(student.FirstName))
                {
                    var firstName = "%" + student.FirstName.ToLower().Trim() + "%";
                    baseSql += " AND LOWER(FirstName) LIKE {" + parameterIndex++ + "}";
                    parameters.Add(firstName);
                }

                // Add filter for LastName if provided
                if (!string.IsNullOrEmpty(student.LastName))
                {
                    var lastName = "%" + student.LastName.ToLower().Trim() + "%";
                    baseSql += " AND LOWER(LastName) LIKE {" + parameterIndex++ + "}";
                    parameters.Add(lastName);
                }

                // Add filter for Department if provided
                if (!string.IsNullOrEmpty(student.Department))
                {
                    var department = "%" + student.Department.ToLower().Trim() + "%";
                    baseSql += " AND LOWER(Department) LIKE {" + parameterIndex++ + "}";
                    parameters.Add(department);
                }

                // Add filter for Email if provided
                if (!string.IsNullOrEmpty(student.Email))
                {
                    var email = "%" + student.Email.ToLower().Trim() + "%";
                    baseSql += " AND LOWER(Email) LIKE {" + parameterIndex++ + "}";
                    parameters.Add(email);
                }

                // Add filter for PhoneNumber if provided
                if (student.PhoneNumber.HasValue)
                {
                    baseSql += " AND PhoneNumber = {" + parameterIndex++ + "}";
                    parameters.Add(student.PhoneNumber.Value);
                }

                // Add filter for DateOfBirth if provided
                if (student.DateOfBirth.HasValue)
                {
                    baseSql += " AND DateOfBirth = {" + parameterIndex++ + "}";
                    parameters.Add(student.DateOfBirth.Value);
                }

                // Add filter for PlacementStatus if provided
                if (!string.IsNullOrEmpty(student.PlacementStatus))
                {
                    baseSql += " AND LOWER(PlacementStatus) = {" + parameterIndex++ + "}";
                    parameters.Add(student.PlacementStatus.ToLower().Trim());
                }

                Console.WriteLine("Generated SQL: " + baseSql);
                Console.WriteLine($"Parameters: {string.Join(", ", parameters)}");

                // Execute the query with the dynamic parameters
                var result = _context.student.FromSqlRaw(baseSql, parameters.ToArray()).ToList();

                if (!result.Any())
                {
                    return NotFound("No matching students found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching student details: {ex.Message}");
                return StatusCode(500, "Internal server error.");
            }
        }





    }
}
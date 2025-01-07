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
        public ActionResult<IEnumerable<StudentDTO>> GetStudents([FromQuery] StudentDTO student)
        {
            try
            {

                //Console.WriteLine("Starting execution of GetStudents");
                //Console.WriteLine($"RollNumber: {student?.RollNumber}, FirstName: {student?.FirstName}, LastName: {student?.LastName}, Department: {student?.Department}");

                if (student.RollNumber != 0 &&
                    string.IsNullOrEmpty(student.FirstName) &&
                    string.IsNullOrEmpty(student.LastName) &&
                    string.IsNullOrEmpty(student.Department) &&
                    string.IsNullOrEmpty(student.Email) &&
                    student.PhoneNumber != 0 &&
                    !student.DateOfBirth.HasValue &&
                    string.IsNullOrEmpty(student.PlacementStatus))
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

                if (student.RollNumber != 0)
                {
                    query = query.Where(s => s.RollNumber == student.RollNumber);
                }



                if (!string.IsNullOrEmpty(student.FirstName))
                {
                    var fn = student.FirstName.ToString().ToLower();
                    query = query.Where(s => s.FirstName != null && s.FirstName.ToLower().Contains(fn));
                }

                if (!string.IsNullOrEmpty(student.LastName))
                {
                    var ln = student.LastName.ToString().ToLower();
                    query = query.Where(s => s.LastName != null && s.LastName.ToLower().Contains(ln));
                }

                if (!string.IsNullOrEmpty(student.Department))
                {
                    var dpt = student.Department.ToString().ToLower();
                    query = query.Where(s => s.Department != null && s.Department.ToLower().Contains(dpt));
                }

                if (!string.IsNullOrEmpty(student.Email))
                {
                    var mail = student.Email.ToString().ToLower();
                    query = query.Where(s => s.Email != null && s.Email.ToLower().Contains(mail));
                }

                if (student.PhoneNumber.HasValue)
                {
                    query = query.Where(s => s.PhoneNumber == student.PhoneNumber.Value);
                }

                if (student.DateOfBirth.HasValue)
                {
                    query = query.Where(s => s.DateOfBirth == student.DateOfBirth.Value);
                }

                if (!string.IsNullOrEmpty(student.PlacementStatus))
                {
                    query = query.Where(s => string.Equals(s.PlacementStatus, student.PlacementStatus, StringComparison.OrdinalIgnoreCase));
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
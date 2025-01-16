using Microsoft.AspNetCore.Mvc;
using StudentManagement.Data;
using StudentManagement.Models;

namespace StudentManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacementController : ControllerBase
    {
        private readonly ILogger<PlacementController> _logger;
        private readonly MyDbContext _context;

        public PlacementController(ILogger<PlacementController> logger, MyDbContext context)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("placements")]
        public ActionResult<IEnumerable<Placement>> PlacementDetails()
        {
            try
            {
                var placements = _context.placement.ToList();
                return Ok(placements);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching placement details.");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("StudentPlacementDetail")]
        public ActionResult<IEnumerable<StudentDetailDTO>> GetStudentPlacementDetail([FromQuery] int RollNumber)
        {
            try
            {
                var details = (from student in _context.student
                               join placement in _context.placement
                               on student.RollNumber equals RollNumber
                               select new StudentDetailDTO
                               {
                                   RollNumber = student.RollNumber,
                                   FullName = student.FirstName + " " + student.LastName,
                                   CompanyName = placement.CompanyName,
                                   JobRole = placement.JobRole,
                                   CtcOffered = placement.CtcOffered,
                                   JoiningDate = placement.JoiningDate,
                                   Location = placement.Location,
                                   SelectionProcess = placement.SelectionProcess,
                                   QuestionsAsked = placement.QuestionsAsked
                               }).FirstOrDefault();
                if(details != null)
                {
                    return Ok(details);
                }

                return NotFound($"No student found with RollNumber {RollNumber}");
            }

            catch(Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching placement details.");
                return StatusCode(500, "Internal server error");
            }
        }

    }
}

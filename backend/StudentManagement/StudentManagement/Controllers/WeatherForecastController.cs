using Microsoft.AspNetCore.Mvc;
using StudentManagement.Data;
using StudentManagement.Services;

namespace StudentManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
       

        private readonly ILogger<WeatherForecastController> _logger;
       // private readonly MyDbContext _dbContext;
        private readonly WheatherForcastService _example;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, WheatherForcastService example)
        {
            _logger = logger;
            _example = example;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return _example.GetWheatherForcast();
        }


    }
}

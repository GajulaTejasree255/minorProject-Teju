using Microsoft.EntityFrameworkCore;
using StudentManagement.Data;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Getting the connection string
        var connectionString = builder.Configuration.GetConnectionString("Default");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("Connection string 'Default' is not configured.");
        }

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add DbContext
        builder.Services.AddDbContext<MyDbContext>(options => options.UseMySQL(connectionString));

        // Configure CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp", policy =>
            {
                policy.WithOrigins("http://localhost:3000") // React app's URL
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        // Enable CORS
        app.UseCors("AllowReactApp");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}

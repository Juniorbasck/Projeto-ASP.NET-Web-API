using API.Data;
using API.Repositorios;
using API.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal.Patterns;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddEntityFrameworkSqlServer()
                    .AddDbContext<SistemaTarefasDBcontex>(
                        options => options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")
                ));  
            
            builder.Services.AddScoped<IUsuarioReposity, UsuarioReposity>();
            builder.Services.AddScoped<ITarefaReposity, TarefaReposity>();
            builder.Services.AddScoped<ILogin, Login>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
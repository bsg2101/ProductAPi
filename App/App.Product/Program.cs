using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "Go to index.html",
        Contact = new OpenApiContact
        {
            Name = "BSG",
            Email = string.Empty,
            Url = new Uri("https://localhost:7135/index.html"),
        }
    });

    c.DocumentFilter<ExternalDocsFilter>();
});

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
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();

// Custom filter to add external documentation link
public class ExternalDocsFilter : IDocumentFilter
{
    public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
    {
        swaggerDoc.Tags = new List<OpenApiTag>
        {
            new OpenApiTag
            {
                Name = "index.html",
                Description = "Go index html",
                ExternalDocs = new OpenApiExternalDocs
                {
                    Description = "Find more info here",
                    Url = new Uri("https://localhost:7135/index.html")
                }
            }
        };
    }
}

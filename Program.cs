using Microsoft.EntityFrameworkCore;
using Project1.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddMvc();

builder.Services.AddDbContext<CustomerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Server=DESKTOP-05NNNC8;Database=Customer;Trusted_Connection=True;TrustServerCertificate=True;")));

builder.Services.AddDbContext<ProductContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Server=DESKTOP-05NNNC8;Database=Customer;Trusted_Connection=True;TrustServerCertificate=True;")));

builder.Services.AddDbContext<StoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Server=DESKTOP-05NNNC8;Database=Customer;Trusted_Connection=True;TrustServerCertificate=True;")));

builder.Services.AddDbContext<Sales>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Server=DESKTOP-05NNNC8;Database=Customer;Trusted_Connection=True;TrustServerCertificate=True;")));



var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();
app.UseCors();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");


app.MapFallbackToFile("index.html"); ;

app.Run();

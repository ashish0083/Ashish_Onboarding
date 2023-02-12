/*using Microsoft.AspNetCore.Mvc;
using Project1.Models;


namespace Project1.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class CustomerController : Controller
    {
        public readonly CustomerContext _db;

        public CustomerController(CustomerContext db)
        {
            _db = db;
        }
        [HttpGet("/customerdetails")]
        public IActionResult Index()
        {


            *//*IEnumerable<CustomerDetail> CustomerList = _db.CustomerDetails;*//*
            using (var context = new CustomerContext())
            {
                var CustomerList = context.CustomerDetails.Find("id");
                return View(CustomerList);
            }
        }
    }
}*/

// var CustomerList = _db.CustomerDetails.ToList();





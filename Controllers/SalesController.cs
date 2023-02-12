using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;
using System.Linq;  

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly Sales _sales;

        public SalesController(Sales sales)
        {
            _sales = sales;
        }

       

        // GET: api/Sales
        [HttpGet]
        [EnableCors()]
        public async Task<ActionResult<IEnumerable<SalesDetail>>> GetSalesDetails()
        {
           
            return await _sales.SalesDetails.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        [EnableCors()]
        public async Task<ActionResult<SalesDetail>> GetSalesDetail(int id)
        {
            var saleDetail = await _sales.SalesDetails.FindAsync(id);

            if (saleDetail == null)
            {
                return NotFound();
            }

            return saleDetail;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [EnableCors()]

        public async Task<IActionResult> PutSalesDetail(int id, SalesDetail saleDetail)
        {
            if (id != saleDetail.Id)
            {
                return BadRequest();
            }

            _sales.Entry(saleDetail).State = EntityState.Modified;

            try
            {
                await _sales.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [EnableCors()]
        public async Task<ActionResult<SalesDetail>> PostSalesDetail(SalesDetail saleDetail)
        {
            _sales.SalesDetails.Add(saleDetail);
            await _sales.SaveChangesAsync();

            return CreatedAtAction("GetSalesDetail", new { id = saleDetail.Id }, saleDetail);
        }

        // DELETE: api/Sales/delete/5
        [HttpDelete("/api/Sales/delete/{id}")]
        [EnableCors()]
        public async Task<IActionResult> DeleteSalesDetail(int id)
        {
            var saleDetail = await _sales.SalesDetails.FindAsync(id);
            if (saleDetail == null)
            {
                return NotFound();
            }

            _sales.SalesDetails.Remove(saleDetail);
            await _sales.SaveChangesAsync();

            return NoContent();
        }

        private bool SalesDetailExists(int id)
        {
            return _sales.SalesDetails.Any(e => e.Id == id);
        }
    }
}

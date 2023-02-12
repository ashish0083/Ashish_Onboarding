using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly StoreContext _storecontext;

        public StoreController(StoreContext storecontext)
        {
            _storecontext = storecontext;
        }

        // GET: api/StoreDetails
        [HttpGet]
        [EnableCors()]
        public async Task<ActionResult<IEnumerable<StoreDetail>>> GetStoreDetails()
        {
            return await _storecontext.StoreDetails.ToListAsync();
        }

        // GET: api/StoreDetails/5
        [HttpGet("{id}")]
        [EnableCors()]
        public async Task<ActionResult<StoreDetail>> GetStoreDetail(int id)
        {
            var storeDetail = await _storecontext.StoreDetails.FindAsync(id);

            if (storeDetail == null)
            {
                return NotFound();
            }

            return  storeDetail;
        }

        // PUT: api/StoreDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [EnableCors()]

        public async Task<IActionResult> PutStoreDetail(int id, StoreDetail storeDetail)
        {
            if (id != storeDetail.Id)
            {
                return BadRequest("Store Not Found");
            }

            _storecontext.Entry(storeDetail).State = EntityState.Modified;

            try
            {
                await _storecontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreDetailExists(id))
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

        // POST: api/StoreDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [EnableCors()]
        public async Task<ActionResult<StoreDetail>> PostProductDetail(StoreDetail storeDetail)
        {
            _storecontext.StoreDetails.Add(storeDetail);
            await _storecontext.SaveChangesAsync();

            return CreatedAtAction("GetProductDetail", new { id = storeDetail.Id }, storeDetail);
        }

        // DELETE: api/StoreDetails/delete/5
        [HttpDelete("/api/Store/delete/{id}")]
        [EnableCors()]
        public async Task<IActionResult> DeleteStoreDetail(int id)
        {
            var storeDetail = await _storecontext.StoreDetails.FindAsync(id);
            if (storeDetail == null)
            {
                return NotFound();
            }

            _storecontext.StoreDetails.Remove(storeDetail);
            await _storecontext.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreDetailExists(int id)
        {
            return _storecontext.StoreDetails.Any(e => e.Id == id);
        }
    }
}

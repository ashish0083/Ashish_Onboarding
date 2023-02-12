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
    public class ProductDetailsController : ControllerBase
    {
        private readonly ProductContext _productcontext;

        public ProductDetailsController(ProductContext productcontext)
        {
            _productcontext = productcontext;
        }

        // GET: api/ProductDetails
        [HttpGet]
        [EnableCors()]
        public async Task<ActionResult<IEnumerable<ProductDetail>>> GetProductDetails()
        {
            return await _productcontext.ProductDetails.ToListAsync();
        }

        // GET: api/ProductDetails/5
        [HttpGet("{id}")]
        [EnableCors()]
        public async Task<ActionResult<ProductDetail>> GetProductDetail(int id)
        {
            var productDetail = await _productcontext.ProductDetails.FindAsync(id);

            if (productDetail == null)
            {
                return NotFound();
            }

            return productDetail;
        }

        // PUT: api/ProductDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [EnableCors()]

        public async Task<IActionResult> PutProductDetail(int id, ProductDetail productDetail)
        {
            if (id != productDetail.Id)
            {
                return BadRequest();
            }

            _productcontext.Entry(productDetail).State = EntityState.Modified;

            try
            {
                await _productcontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductDetailExists(id))
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

        // POST: api/ProductDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [EnableCors()]
        public async Task<ActionResult<ProductDetail>> PostProductDetail(ProductDetail productDetail)
        {
            _productcontext.ProductDetails.Add(productDetail);
            await _productcontext.SaveChangesAsync();

            return CreatedAtAction("GetProductDetail", new { id = productDetail.Id }, productDetail);
        }

        // DELETE: api/ProductDetails/delete/5
        [HttpDelete("/api/ProductDetails/delete/{id}")]
        [EnableCors()]
        public async Task<IActionResult> DeleteProductDetail(int id)
        {
            var productDetail = await _productcontext.ProductDetails.FindAsync(id);
            if (productDetail == null)
            {
                return NotFound();
            }

            _productcontext.ProductDetails.Remove(productDetail);
            await _productcontext.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductDetailExists(int id)
        {
            return _productcontext.ProductDetails.Any(e => e.Id == id);
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace App.Product.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private static List<Product> _products = new();

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _products;
        }

        [HttpGet("{id}")]
        public Product? Get(int id)
        {
            return _products.Find(p => p.Id == id);
        }

        [HttpPost]
        public IActionResult Post(Product product)
        {
            _products.Add(product);
            var json = JsonSerializer.Serialize(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, json);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Product product)
        {
            var index = _products.FindIndex(p => p.Id == id);
            if (index < 0)
            {
                return NotFound();
            }

            _products[index] = product;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var index = _products.FindIndex(p => p.Id == id);
            if (index < 0)
            {
                return NotFound();
            }

            _products.RemoveAt(index);
            return NoContent();
        }
        
    }
}

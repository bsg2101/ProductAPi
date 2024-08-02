using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace App.Product.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private static List<Product> _products = new List<Product>();

        [HttpGet]
        public List<Product> Get()
        {
            return _products;
        }

        [HttpGet("{id}")]
        public Product? Get(int id)
        {
            return _products.Find(p => p.Id == id);
        }

        [HttpPost]
        public IActionResult Post([FromForm] Product product)
        {
           
             _products.Add(product);
            return Ok(new {message = "succes" });
          
        }
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Product updatedProduct)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Category = updatedProduct.Category;

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

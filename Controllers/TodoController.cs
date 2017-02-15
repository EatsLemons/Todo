using TodoApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {

        public ITodoRepository TodoItems { set; get; }

        public TodoController(ITodoRepository todoItems)
        {
            TodoItems = todoItems;
        }

        [HttpGet]
        public IEnumerable<TodoItem> GetAll()
        {
            return TodoItems.GetAll();
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(string id)
        {
            var item = TodoItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TodoItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            TodoItems.Add(item);
            return CreatedAtRoute("GetTodo", new {id = item.Key}, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id,[FromBody] TodoItem item)
        {
            if (item == null && item.Key != id)
            {
                return BadRequest();
            }
            var todo = TodoItems.Find(id);
            if (todo == null)
            {
                return NotFound();
            }
            TodoItems.Update(item);
            return new NoContentResult();
        }

        [HttpDeleteAttribute("{id}")]
        public IActionResult Delete(string id)
        {
            var todo = TodoItems.Find(id);
            if (todo == null)
            {
                return NotFound();
            }
            TodoItems.Remove(id);
            return new NoContentResult();
        }
    }
}
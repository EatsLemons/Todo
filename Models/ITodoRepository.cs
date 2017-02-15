using System.Collections.Generic;

namespace TodoApi.Models
{
    public interface ITodoRepository
    {
        void Add(TodoItem item);
        void Update(TodoItem item);
        TodoItem Find(string key);
        TodoItem Remove(string key);
        IEnumerable<TodoItem> GetAll();
    }
}
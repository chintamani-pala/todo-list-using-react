import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const TodoItems = ({ todos, setTodos, editingIndex, setEditingIndex, handleEditTodo }) => {
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState('Low');
  const [editAi,setEditAi] = useState('No AI');

  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
    setEditPriority(todos[index].priority);
    setEditAi(todos[index].ai);
  };

  const handleEditSubmit = (e, index) => {
    e.preventDefault();
    handleEditTodo(index, editText, editPriority, editAi);
    setEditingIndex(null); // Exit edit mode after submitting
  };

  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {todos.map((todo, index) => (
          <li key={index} className={`flex flex-col md:flex-row items-center justify-between p-4 ${todo.completed ? 'bg-gray-100' : 'bg-white'}`}>
            <div className="flex items-center w-full">
              <input 
                type="checkbox" 
                className="mr-2"
                checked={todo.completed}
                onChange={() => handleToggleTodo(index)} 
              />
              {index === editingIndex ? (
                <form onSubmit={(e) => handleEditSubmit(e, index)} className="flex flex-col w-full md:flex-row md:items-center">
                  <input 
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="md:w-[60%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0 md:mr-2 flex-grow"
                    type="text" 
                    required 
                  />
                  <select 
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="md:w-[25%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0 md:mr-2"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  <select 
                    value={editAi}
                    onChange={(e) => setEditAi(e.target.value)}
                    className="md:w-[25%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0 md:mr-2"
                  >
                   <option value="No AI">No AI</option>
                   <option value="Chat GPT">Chat GPT</option>
                  </select>
                  <div className="flex md:flex-row justify-between items-start md:items-center md:space-x-2 mt-2 md:mt-0">
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      type="submit"
                    >
                      Save
                    </button>
                     <button 
                      className="bg-gray-500 md:hidden text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      onClick={() => setEditingIndex(null)}
                    >
                      Cancel
                    </button> 
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className={`whitespace-normal break-all ${todo.completed ? 'line-through text-gray-500' : 'text-black'} mb-1 md:mb-0 md:mr-2`}>
                    {todo.text}
                  </span>
                  <div className="flex md:flex-row flex-col md:space-x-2 mt-2 md:mt-0">
                    <button 
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 md:mb-0 mb-1"
                      onClick={() => startEditing(index)}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={() => handleRemoveTodo(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItems;


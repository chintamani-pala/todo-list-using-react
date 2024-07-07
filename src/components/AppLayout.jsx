import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import TodoItems from "./TodoItems";
import AddItems from "./AddItems";
import Time from "./Time";
import Swal from "sweetalert2";

function TodoListApp() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("myTodos"));
    if (storedTodos && Array.isArray(storedTodos)) {
      return storedTodos;
    } else {
      return [];
    }
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });


  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const sortTodosByPriority = (todos) => {
    return [...todos].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const handleEditTodo = (
    index,
    newText,
    newPriority,
    newAi,
    newStartTime,
    newEndTime
  ) => {
    if(newText.trim() === "" || newPriority.trim() === "" || newAi.trim() === "" || newStartTime.trim() === "" || newEndTime.trim() === "" || newStartTime==null || newEndTime==null || newStartTime==undefined || newEndTime==undefined) {
      Toast.fire({
        icon: "error",
        title: "Please fill all fields",
      });
      return 
    }
    const updatedTodos = todos.map((todo, i) =>
      i === index
        ? {
            ...todo,
            text: newText,
            priority: newPriority,
            ai: newAi,
            startTime: newStartTime,
            endTime: newEndTime,
          }
        : todo
    );
    setTodos(sortTodosByPriority(updatedTodos));
    setEditingIndex(null);
    Toast.fire({
      icon: "success",
      title: "All todo deleted successfully",
    });
  };
  // Save todos to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem("myTodos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  const handleClearTodos = () => {
    
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setTodos([]);
          localStorage.removeItem("myTodos");
          
          Toast.fire({
            icon: "success",
            title: "All todo deleted successfully",
          });
        }
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-3">
        <h1 className="text-3xl font-bold mb-1 text-center">Todo List</h1>
        <Time />
        <AddItems setTodos={setTodos} todos={todos} />
        <TodoItems
          todos={todos}
          setTodos={setTodos}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          handleEditTodo={handleEditTodo}
        />
        {todos.length > 0 && (
          <button
            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 md:mb-0 mb-1"
            onClick={handleClearTodos}
          >
            Clear All Todos
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoListApp;

import React, { useEffect, useState } from "react";
import {
  useGetLocalTime,
  getTodayEndTime,
} from "../assets/utils/useGetLocalTime";
import Swal from "sweetalert2";
const AddItems = ({ setTodos, todos }) => {
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("Low");
  const [ai, setAi] = useState("No AI");
  const [error, setError] = useState("");
  const [startTime, setStartTime] = useState(useGetLocalTime());
  const [endTime, setEndTime] = useState(getTodayEndTime());

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

  const handleAddTodo = (e) => {
    e.preventDefault();
    const checkAlreadyExist = () => {
      return todos.find((todo) => todo.text.trim() === newTodo.trim());
    };
    if (checkAlreadyExist()) {
      setError("Todo already exists");
    } else if (newTodo.trim()) {
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      setStartTime(useGetLocalTime());
      setEndTime(getTodayEndTime());
      if(startTime.trim()=="" || endTime.trim()=="" || startTime==null || endTime==null || startTime==undefined || endTime==undefined) {
        
        Toast.fire({
          icon: "error",
          title: "Please fill all fields",
        });
        return   
      }

      const updatedTodos = [
        ...todos,
        { text: newTodo.trim(), completed: false, priority, ai, startTime, endTime },
      ];
      setTodos(sortTodosByPriority(updatedTodos));
      setNewTodo("");
      setPriority("Low");
      setAi("No AI");
      setError("");
      Toast.fire({
        icon: "success",
        title: "Todo added successfully",
      });
    } else {
      setError("Todo text cannot be empty.");
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTodo} className="flex flex-col mb-4">
        <div className="flex mb-2">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Add a new task"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Add
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex space-x-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <select
            value={ai}
            onChange={(e) => setAi(e.target.value)}
            className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="No AI">No AI</option>
            <option value="Chat GPT">Chat GPT</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <input
            type="datetime-local"
            className="mt-1 w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startTime}
            min={useGetLocalTime()}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="datetime-local"
            className="mt-1 w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endTime}
            min={startTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default AddItems;

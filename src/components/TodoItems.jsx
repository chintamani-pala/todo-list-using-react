import React, { useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useGetLocalTime,
  getTodayEndTime,
} from "../assets/utils/useGetLocalTime";
const TodoItems = ({
  todos,
  setTodos,
  editingIndex,
  setEditingIndex,
  handleEditTodo,
}) => {
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Low");
  const [editAi, setEditAi] = useState("No AI");
  const [startTime, setStartTime] = useState(useGetLocalTime());
  const [endTime, setEndTime] = useState(getTodayEndTime());
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleDropdown = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
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
    setStartTime(todos[index].startTime)
    setEndTime(todos[index].endTime)
  };

  const handleEditSubmit = (e, index) => {
    e.preventDefault();
    console.log(startTime, endTime);
    if(startTime.trim()=="" || endTime.trim()=="" || startTime==null || endTime==null || editText=="" || editText==null || startTime==undefined || endTime==undefined) {
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
      Toast.fire({
        icon: "error",
        title: "Please fill all fields",
      });     
    }
    handleEditTodo(index, editText, editPriority, editAi, startTime, endTime);
    setEditingIndex(null); // Exit edit mode after submitting
  };

  // Function to check if current time is between start and end times
  const isCurrentTimeInRange = (startTime, endTime) => {
    const now = new Date();
    const currentDateTime = now.getTime();
    const startDateTime = new Date(startTime).getTime();
    const endDateTime = new Date(endTime).getTime();
    return currentDateTime >= startDateTime && currentDateTime <= endDateTime;
  };

  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex flex-col w-full max-w-full items-center justify-between rounded-lg mb-1 p-2 ${
              todo.completed
                ? "bg-green-100"
                : isCurrentTimeInRange(todo.startTime, todo.endTime)
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          >
            <div className="flex items-center w-[90%]">
              <input
                type="checkbox"
                className="mr-2"
                checked={todo.completed}
                onChange={() => handleToggleTodo(index)}
              />
              {index === editingIndex ? (
                <form
                  onSubmit={(e) => handleEditSubmit(e, index)}
                  className="flex flex-col w-full"
                >
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full max-w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 flex-grow"
                    type="text"
                    required
                  />
                  <div className="flex space-x-2">
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="w-full max-w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0 md:mr-2"
                    >
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                    </select>
                    <select
                      value={editAi}
                      onChange={(e) => setEditAi(e.target.value)}
                      className="w-full max-w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0 md:mr-2"
                    >
                      <option value="No AI">No AI</option>
                      <option value="Chat GPT">Chat GPT</option>
                    </select>
                  </div>
                  <div className="flex space-x-2 w-[97%]">
                    <input
                      type="datetime-local"
                      className="mt-1 w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={startTime}
                      // eslint-disable-next-line react-hooks/rules-of-hooks
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
                  <div className="flex justify-center items-center space-x-2 mt-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      onClick={() => setEditingIndex(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`whitespace-normal break-all ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-black"
                    } mb-1 md:mb-0 md:mr-2`}
                  >
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
            <div
              className="w-[90%] flex items-center justify-between cursor-pointer"
              onClick={() => toggleDropdown(index)}
            >
              <span>{expandedIndex === index ? 'Hide' : 'Show'} details</span>
              {expandedIndex === index ? (
                <FaArrowCircleUp style={{ fontSize: "20px" }} />
              ) : (
                <FaArrowCircleDown style={{ fontSize: "20px" }} />
              )}
            </div>
            {expandedIndex === index && (
              <div className="w-full mt-2 p-4 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Priority:</span> {todo.priority}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Status:</span> {todo.completed ? "Completed" : "Not Completed"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">AI:</span> {todo.ai}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Start Time:</span>{" "}
                  {todo.startTime}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">End Time:</span> {todo.endTime}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItems;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../store/store";
import Todos from "./Todos";

const Form = () => {
  const [taskInput, setTaskInput] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null); //If editingTodoId is null, it means we’re adding a new task:

  const todos = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const handleAddOrEdit = async () => {
    if (!taskInput.trim()) return;

    try {
      if (editingTodoId) {
        //update the existing task
        const res = await axios.post(
          BASE_URL + "/edit",
          { _id: editingTodoId, task: taskInput },
          { withCredentials: true }
        );
        // console.log(res.data);
        dispatch(editTask(res.data));
        setEditingTodoId(null);
      } else {
        const res = await axios.post(
          BASE_URL + "/add",
          { task: taskInput, completed : false },
          { withCredentials: true }
        );
        dispatch(addTask(res.data));
      }

      setTaskInput("");
    } catch (err) {
      console.log("ERROR:" + err);
    }
  };

  const handleEditClick = (todo) => {
    setTaskInput(todo.task);      // Set input field to existing task text
    setEditingTodoId(todo._id);   // Store task ID for tracking edit mode
  };

  const handleToggleCompleted = async (todo) =>{
    
    
    if (!todo || !todo._id) {
      console.log("Error: Todo is undefined or missing _id", todo);
      return;
    }
    
    try{
      const updateTask = {...todo, completed: !todo.completed}
      const res = await axios.post(BASE_URL+"/edit",updateTask,{withCredentials:true})
      dispatch(editTask(res.data))
    }catch(err){
      console.log("ERROR:"+err);
      
    }
  }

  return (
    <>
      <div className="flex justify-center m-10">
        <input
          type="text"
          className="border w-2xl px-4 py-2 rounded-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white my-1 px-6 py-3 cursor-pointer rounded-lg ml-2 hover:bg-blue-600"
          type="button"
          onClick={handleAddOrEdit}
        >
          {editingTodoId ? "UPDATE" : "ADD"}
        </button>
      </div>

      {todos.length === 0 ? (
        <h1 className="text-3xl text-center font-bold">Add Some Todos</h1>
      ) : (
        todos.map((todo) => (
          <Todos key={todo._id} todo={todo} handleEdit={handleEditClick} handleToggleCompleted={handleToggleCompleted} />
        ))
      )}
    </>
  );
};

export default Form;

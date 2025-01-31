import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../store/store";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Todos = ({ todo, handleEdit, handleToggleCompleted }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axios.post(
        BASE_URL + "/delete",
        { _id: id },
        { withCredentials: true }
      );
      dispatch(deleteTask(id));
    } catch (err) {
      console.log("ERROR:" + err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-around bg-white shadow-md rounded-lg p-4 mb-4 w-2xl">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleCompleted(todo)}
        />

        <p className={`w-2/3 mx-3 text-1.5xl py-2 ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.task}</p>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
          onClick={() => handleEdit(todo)}
        >
          <FaEdit />
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded"
          onClick={() => handleDelete(todo._id)}
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default Todos;

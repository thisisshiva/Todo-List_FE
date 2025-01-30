import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/store";

const Form = () => {
  const [taskInput, setTaskInput] = useState("");
  const [taskEdit, setTaskEdit] = useState(false);

  const dispatch = useDispatch()


  const handleAdd = async () => {
    if (!taskInput.trim()) return;
    try {
      const res = await axios.post(
        BASE_URL + "/add",
        { task: taskInput },
        { withCredentials: true }
      );
      dispatch(addTask(res.data))
      setTaskInput("")
      // console.log("this log is from ",res.data);
    } catch (err) {
      console.log("ERROR:" + err);
    }
  };


  // const fetchdata = async (id)=>{
  //   await axios.post(BASE_URL+"/edit",{_id: id},{withCredentials:true})
  //   dispatch(editTask())
  // }
  // const handleEdit = (id)=>{
  //   fetchdata(id)
  // }

  return (
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
        onClick={handleAdd}
      >
        ADD
      </button>
    </div>
  );
};

export default Form;

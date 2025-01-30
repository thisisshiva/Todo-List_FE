import { useEffect, useState } from "react";
import Form from "./components/Form";
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import Todos from "./components/Todos";
import Heading from "./components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./store/store";

function App() {

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.task);

  const fetchdata = async () => {
    try {
      const res = await axios.get(BASE_URL + "/get", { withCredentials: true });
      dispatch(addTask(res.data));
    } catch (err) {
      console.log("ERROR:" + err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [dispatch]);

  return (
    <>
      <Heading />
      <Form />

      {todos.length === 0 ? (
        <h1 className="text-3xl text-center font-bold">Add Some Todos</h1>
      ) : (
        todos.map((todo) => <Todos key={todo._id} todo={todo} />)
      )}
    </>
  );
}

export default App;

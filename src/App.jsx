import { useEffect } from "react";
import Form from "./components/Form";
import axios from "axios";
import { BASE_URL } from "./utils/constant";

import Heading from "./components/Heading";
import { useDispatch } from "react-redux";
import { addTask } from "./store/store";

function App() {
  const dispatch = useDispatch();

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
    </>
  );
}

export default App;

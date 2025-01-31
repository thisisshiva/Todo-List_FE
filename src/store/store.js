import { createStore } from "redux";

const initialState = {
  task: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "task_add":
      if (Array.isArray(action.payload)) {
        // If payload is an array, replace tasks (used for initial fetch)
        return { ...state, task: action.payload };
      } else {
        // Otherwise, add a single task
        return { ...state, task: [...state.task, action.payload] };
      }

    case "task_delete":
      return {
        ...state,
        task: state.task.filter((task) => task._id !== action.payload),
      };

    case "task_edit":
      return {
        ...state,
        task: state.task.map((tasks) =>
          tasks._id === action.payload._id ? action.payload : tasks
        ),
      };

    default:
      return state;
  }
};

export const store = createStore(
  taskReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const addTask = (data) => {
  return { type: "task_add", payload: data };
};

export const deleteTask = (id) => {
  return { type: "task_delete", payload: id };
};

export const editTask = (task) => {
  return { type: "task_edit", payload: task };
};

import { useEffect, useId, useState } from "react";
import axios from "axios";

import downloadFile from "./utils/downlodFile";

import UserForm from "./components/UserForm";
import EditForm from "./components/EditForm";
import TasksList from "./components/TasksList";

function App() {
  const [tasks, setTasks] = useState([]);

  const [previousFocusEl, setPreviousFocusEl] = useState(false);

  const [editedTask, setEditedTask] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const id = useId();

  const enterEditMode = (task) => {
    setEditedTask(() => task);
    setIsEditing(() => true);
    setPreviousFocusEl(document.activeElement);
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  };

  const showTasks = async () => {
    try {
      const { data } = await axios.get("/show/todos");
      setTasks(() => data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    try {
      const result = await axios.post("/create/todos", task);

      if (result.status == 201) {
        showTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const result = await axios.delete(`/delete/todos/${id}`);

      if (result.status == 200) {
        showTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (id, task) => {
    try {
      const result = await axios.put(`/update/todos/${id}`, task);

      if (result.status == 201) {
        showTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const result = await axios.put(`/update/todos/${updatedTask.Id}`, {
        Description: `${updatedTask.Description}`,
      });

      if (result.status == 201) {
        showTasks();
      }
    } catch (error) {
      console.log(error);
    }

    closeEditMode();
  };

  const deleteTasksList = async () => {
    try {
      const result = await axios.delete(`/delete/todos`);

      if (result.status == 200) {
        showTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadTasksList = async (data) => {
    try {
      const result = await axios.put(`/upload/todos`, data);

      if (result.status == 201) {
        showTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");

    fileReader.onload = (e) => {
      const data = JSON.parse(e.target.result);

      deleteTasksList();
      uploadTasksList(data);
    };
  };

  useEffect(() => {
    showTasks();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>МОЙ СПИСОК ДЕЛ</h1>
      </header>
      {isEditing && (
        <EditForm editedTask={editedTask} updateTask={updateTask} />
      )}
      <UserForm addTask={addTask} />
      {tasks.length > 0 ? null : (
        <div className="emptyList">СПИСОК ДЕЛ ПУСТ</div>
      )}
      {tasks.length > 0 && (
        <TasksList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
      {tasks.length <= 0 ? null : (
        <button
          className="download"
          value="download"
          onClick={() => downloadFile(tasks)}
        >
          СКАЧАТЬ СПИСОК ДЕЛ
        </button>
      )}
      <label className="upload" htmlFor={id}>
        <input className="none" type="file" id={id} onChange={uploadFile} />
        ОТКРЫТЬ СПИСОК ДЕЛ
      </label>
    </div>
  );
}

export default App;

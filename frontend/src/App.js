import { useEffect, useId, useState} from "react";
import axios from 'axios';

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

	const showTasks = async () => {
		try{
			const {data} = await axios.get('/show/todos');
			setTasks(data);
			
		}catch(error){
			console.log(error);
		}
	}

	useEffect(() => {
		showTasks();
		console.log(tasks);
	}, []);


	

    const addTask = (task) => {
        setTasks((prevState) => ([...prevState, task]));
    };

    const deleteTask = (id) => {
        setTasks((prevState) =>
            prevState.filter((task) => (task.id !== id))
        );
    };

    const toggleTask = (id) => {
		setTasks((prevState) => prevState.map(
			(task) => (task.id === id ? {...task, checked: !task.checked} : task)));
    }

	const updateTask = (updatedTask) => {
		setTasks((prevState) => prevState.map(
			(task) => (task.id === updatedTask.id ? {...task, name: updatedTask.name} : task)));
		closeEditMode();
    }

	const closeEditMode = () => {
		setIsEditing(false);
		previousFocusEl.focus();
	}

	const enterEditMode = (task) => {
		setEditedTask(task);
		setIsEditing(true);
		setPreviousFocusEl(document.activeElement);
	}

	const deleteTasksList = () => {
		setTasks(() => ([]));
	}

	const uploadTasksList = (data) => {
		data.forEach(element => {
			addTask(element);
		});
	}

	const uploadFile = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
	
		fileReader.onload = (e) => {
		  const data = JSON.parse(e.target.result);

		  deleteTasksList();
		  uploadTasksList(data);
		};
	}

	
	

    return (
        <div className="container">
            <header>
                <h1>МОЙ СПИСОК ДЕЛ</h1>
            </header>
			{
				isEditing && (
					<EditForm
						editedTask={editedTask}
						updateTask={updateTask}
					/>
				)
			}
            <UserForm addTask={addTask} />
			{tasks.length > 0 ? null : 
				<div className="emptyList">СПИСОК ДЕЛ ПУСТ</div>
			}
            {tasks.length > 0 && 
				<TasksList 
					tasks={tasks} 
					deleteTask={deleteTask} 
					toggleTask={toggleTask} 
					enterEditMode={enterEditMode}
				/>
			}
			{tasks.length <= 0 ? null : 
				<button 
					className="download"
					value="download"
					onClick={() => downloadFile(tasks)}
				>
					СКАЧАТЬ СПИСОК ДЕЛ
				</button>
			}
			<label className="upload" htmlFor={id}>
      			<input className="none" type="file" id={id} onChange={uploadFile} />
					ОТКРЫТЬ СПИСОК ДЕЛ
    		</label>
        </div>
    );
}

export default App;

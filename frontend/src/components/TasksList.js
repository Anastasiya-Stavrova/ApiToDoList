import styles from "./Task.module.css";

import Task from "./Task";

const TasksList = ({ tasks, deleteTask, toggleTask, enterEditMode }) => {
  return (
    <ul className={styles.tasks}>
      {tasks
        .sort((a, b) => b.Id - a.Id)
        .map((task) => (
          <Task
            key={task.Id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            enterEditMode={enterEditMode}
          />
        ))}
    </ul>
  );
};

export default TasksList;

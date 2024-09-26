import { useState } from "react";

import { CheckIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import styles from "./Task.module.css";

const Task = ({ task, deleteTask, toggleTask, enterEditMode }) => {
    const [isChecked, setIsChecked] = useState(task.checked);

    const checkboxChangeHandler = () => {
        setIsChecked(!isChecked);
        toggleTask(task.id);
    };

    return (
        <li className={styles.task}>
            <div className={styles["task-group"]}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={isChecked}
                    name={task.name}
                    id={task.id}
                    onChange={checkboxChangeHandler}
                />
                <label className={styles.label} htmlFor={task.id}>
                    {task.name}
                    <p className={styles.checkmark}>
                        <CheckIcon strokeWidth={5} width={24} height={24}/>
                    </p>
                </label>
            </div>
            <div className={styles["task-group"]}>
                <button
                    className='btn'
                    aria-label={`Update ${task.name} Task`}
                    onClick={() => enterEditMode(task)}
                >
                    <PencilSquareIcon width={24} height={24}/>
                </button>
                <button
                    className={`btn ${styles.delete}`}
                    aria-label={`Delete ${task.name} Task`}
                    onClick={() => deleteTask(task.id)}
                >
                    <TrashIcon width={24} height={24}/>
                </button>
            </div>
        </li>
    );
};

export default Task;

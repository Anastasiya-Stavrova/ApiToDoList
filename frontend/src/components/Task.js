import { useState } from "react";

import { CheckIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import styles from "./Task.module.css";

const Task = ({ task, deleteTask, toggleTask, enterEditMode }) => {
    const [isChecked, setIsChecked] = useState(task.IsCompleted == 0 ? false : true);

    const checkboxChangeHandler = () => {
        setIsChecked(() => (isChecked == false ?  true : false));
        toggleTask(task.Id, {"IsCompleted" : `${task.IsCompleted == 0 ? 1 : 0}`} );
    };

    return (
        <li className={styles.task}>
            <div className={styles["task-group"]}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={isChecked}
                    name={task.Description}
                    id={task.Id}
                    onChange={checkboxChangeHandler}
                />
                <label className={styles.label} htmlFor={task.Id}>
                    {task.Description}
                    <p className={styles.checkmark}>
                        <CheckIcon strokeWidth={5} width={24} height={24}/>
                    </p>
                </label>
            </div>
            <div className={styles["task-group"]}>
                <button
                    className='btn'
                    aria-label={`Update ${task.Description} Task`}
                    onClick={() => enterEditMode(task)}
                >
                    <PencilSquareIcon width={24} height={24}/>
                </button>
                <button
                    className={`btn ${styles.delete}`}
                    aria-label={`Delete ${task.Description} Task`}
                    onClick={() => deleteTask(task.Id)}
                >
                    <TrashIcon width={24} height={24}/>
                </button>
            </div>
        </li>
    );
};

export default Task;

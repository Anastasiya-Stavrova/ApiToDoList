import { useState } from "react";

import { PlusCircleIcon } from '@heroicons/react/24/solid';

const UserForm = ({addTask}) => {
    const [task, setTask] = useState("");

    const formSubmitHundler = (event) => {
        event.preventDefault(); /*Убираем сброс страницы*/

        addTask({
            name: task,
            checked: false,
            id: Date.now(),
        });

        setTask(""); /*Очищаем поле ввода*/
    };

    return (
        <form 
            className="toDo" 
            onSubmit={formSubmitHundler}
        >
            <div className="wrapper">
                <input
                    className="input"
                    type="text"
                    id="task"
                    value={task}
                    onInput={(text) => setTask(text.target.value)}
                    required /*Поле нельзя оставить пустым*/
                    autoFocus /*Автоматически устанавливает фокус в поле формы*/
                    maxLength={80} /*Максимальное кол-во символов*/
                    placeholder="Ввести задачу"
                />
                <label 
                    className="label" htmlFor="task">Ввести задачу</label>
            </div>
            <button 
                className="btn" 
                aria-label="Add Task" 
                type="submit">
                    <PlusCircleIcon/>
            </button>
        </form>
    );
};

export default UserForm;

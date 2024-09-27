import { useState } from "react";

import { CheckIcon} from '@heroicons/react/24/solid';

const EditForm = ({editedTask, updateTask}) => {
    const [updatedTask, setUpdatedTask] = useState(editedTask.Description);

    const formSubmitHundler = (event) => {
        event.preventDefault(); /*Убираем сброс страницы*/
        updateTask({...editedTask, "Description" : `${updatedTask}`});
    };

    return (
        <div 
            role="dialog" 
            aria-labelledby="editTask"
            /* onClick={} */>
            <form 
                className="toDo" 
                onSubmit={formSubmitHundler}
            >
                <div className="wrapper">
                    <input
                        className="input"
                        type="text"
                        id="editTask"
                        value={updatedTask}
                        onInput={(event) => setUpdatedTask(event.target.value)}
                        required /*Поле нельзя оставить пустым*/
                        autoFocus /*Автоматически устанавливает фокус в поле формы*/
                        maxLength={60} /*Максимальное кол-во символов*/
                        placeholder="Измените задачу"
                    />
                    <label 
                        className="label" 
                        htmlFor="editTask"
                    >Изменить задачу</label>

                </div>
                <button 
                    className="btn" 
                    aria-label="Update Task" 
                    type="submit">
                        <CheckIcon strokeWidth={2} height={24} width={24}/>
                </button>
            </form>
        </div>
    );
};

export default EditForm;

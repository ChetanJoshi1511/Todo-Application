import { useTodoContext } from '../context';
import React, { useState } from 'react';

const TodoForm = () => {

    const {addTodo, pendingSave} = useTodoContext(); //get add method from context
    const [todoText,setTodoText] = useState("");

    const addTodoToList = (e)=>{
        e.preventDefault();
        if(!todoText || pendingSave) return; //if not saved don't add new list component
        addTodo({todoText:todoText,completed:false});
        setTodoText("");
    }

    return (
        <form onSubmit={addTodoToList} className="todo-box">
            <input className='input-todo-box'
                type="text"
                placeholder="Write Todo..."
                
                value={todoText}
                onChange={(e)=>{setTodoText(e.target.value)}}
            />
            <button type="submit" className="add-btn btn">
                <img src="/assets/add.png" alt="add-icon"/>
            </button>
        </form>
    );
};

export default TodoForm;
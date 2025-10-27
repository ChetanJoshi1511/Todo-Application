import {useTodoContext } from "../context/index";
import {useState} from 'react';

export default function ListItem({todo}){

    const {updateTodo, deleteTodo, toggleComplete, pendingSave,setPendingSave} = useTodoContext();
    const [isEditable,setIsEditable] = useState(false);
    const [newText, setNewText] = useState(todo.todoText);

    return (
        <div
            className={`w-[50vw] flex justify-center border m-5 border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  
                text-black ${todo.completed ? "bg-[#d31461]" : "bg-[#c6e9a7]"}`}
        >
            {isEditable ? <></>:
                <label class="custom-checkbox">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={todo.completed}
                    onChange={()=>{toggleComplete(todo.id)}}
                />
                </label>
            }
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                readOnly={!isEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="btn inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;
                    if (isEditable) { //save button was clicked
                        setPendingSave(false);
                        updateTodo(todo.id,{...todo,todoText:newText});
                        setIsEditable(false); //set it back to non-edit mode
                    }else{
                        if(pendingSave) return;
                        setPendingSave(true);
                        setIsEditable((prev) => !prev);
                    } 
                }}
                disabled={todo.completed}
            >
                {isEditable ? <img src="/assets/diskette.png" alt="delete"/> : <img src="/assets/pencil.png" alt="delete"/>}
            </button>
            {/* Delete Todo Button */}
            <button
                className="btn-del inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
            <img src="/assets/delete.png" alt="delete"/>
            </button>
        </div>
    
    );
};
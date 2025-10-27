import { createContext,useContext,useState } from "react";

export const TodoContext = createContext(
    {
        //list of todos
        todos:[ 
            {
                id:1,
                todoText: "Todo Msg",
                completed: false
            }
        ],
        //method to add todo
        addTodo: (todo) => {},
        updateTodo: (id,todo) => {},
        deleteTodo: (id) => {},
        toggleComplete: (id) => {},
        pendingSave: false,
        setPendingSave: ()=>{} //global pendingSave boolean to allow only editing one list component at a time
    }
)

export const useTodoContext = ()=>{
    return useContext(TodoContext);
}

export const TodoContextProvider = TodoContext.Provider;


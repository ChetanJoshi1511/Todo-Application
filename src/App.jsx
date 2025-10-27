import { useState } from 'react'
import { TodoContextProvider} from './context/index'
import {ListItem, TodoForm} from './components/index'
import { useEffect } from 'react';

function App() {

  //todos is an array of todo items (objects)
  const [todos, setTodos] = useState([]);
  const [pendingSave,setPendingSave] = useState(false);

  //add, update, delelte, toggle todo are methods

  const addTodo = (todo)=>{
    setTodos((prev)=>{
      //get the prev todos list item and add new todo item to the list
      return [{id:Date.now(),...todo}, ...prev];
    });
  }

  const updateTodo = (id,todo)=>{
    //get the previous state of todo array
    setTodos((prev)=>{ 
      //for each todoItem match its id if matches update the item with new todo object
      return prev.map((todoItem)=>todoItem.id === id ? todo : todoItem);
    });
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>{
      return prev.filter(todoItem => todoItem.id!=id); //remove todoitem with id
    });
  }

  const toggleComplete = (id)=>{
    setTodos((prev)=>{
      return prev.map((todoItem)=>todoItem.id===id ? {...todoItem,completed:!todoItem.completed}:todoItem);
    });
  }

  //getting todos from local storage
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
      setTodos(todos);
    }
  },[]);

  // setting todo to local storage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  });

  return (
    <TodoContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete, pendingSave,setPendingSave}}>
      <h1 className='rainbow-text'>Todo Application</h1>
      <TodoForm/>
      {todos.map((todoItem)=>{
        return <ListItem key={todoItem.id} todo={todoItem}></ListItem>
      })}
    </TodoContextProvider>
  )
}

export default App

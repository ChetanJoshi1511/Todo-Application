# Todo Application

A modern, feature-rich Todo application built with React and Vite. This application demonstrates efficient state management using React Context API and implements robust CRUD operations with optimizations.

## Features

- ✅ Add new todos
- ✏️ Edit existing todos
- ❌ Delete todos
- ✅ Mark todos as complete/incomplete
- 💾 Automatic local storage persistence
- 🎨 Beautiful UI with animations and gradients
- 🔒 Single edit mode (only one todo can be edited at a time)

## Technology Stack

- **Frontend**: React 18 + Vite
- **State Management**: React Context API
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Custom SVG/PNG assets
- **Storage**: Browser Local Storage

## Project Structure
Todo-App/  
├── public/assets/ # Static assets (icons)  
├── src/ 
│ ├── components/  
│ │ ├── TodoForm.jsx # Add new todo form  
│ │ ├── ListItem.jsx # Individual todo item  
│ │ └── index.js # Component exports  
│ ├── context/  
│ │ ├── TodoContext.jsx # Context definition  
│ │ └── index.js # Context exports   
│ ├── App.jsx # Main application component  
│ ├── main.jsx # Application entry point   
│ └── index.css # Global styles  

## CRUD Operations Implementation

### Create - Add Todo
```
const addTodo = (todo) => {
  setTodos((prev) => {
    return [{ id: Date.now(), ...todo }, ...prev];
  });
};
```
-Uses Date.now() for unique IDs  
-Adds new todo to the beginning of the array  
-Maintains immutability with functional update  

### Read - Display Todos
-Todos are accessed via Context throughout the app

-Automatic rendering with map() function

-Conditional styling based on completion status

### Update - Edit Todo

const updateTodo = (id, todo) => {
```  
setTodos((prev) => {
    return prev.map((todoItem) => 
      todoItem.id === id ? todo : todoItem
    );
  });
};
```

-Finds todo by ID and replaces with updated version  
-Preserves all other properties using spread operator  

Delete - Remove Todo

```
const deleteTodo = (id) => {
  setTodos((prev) => {
    return prev.filter(todoItem => todoItem.id !== id);
  });
};
```


-Uses filter() to remove specific todo  
-Maintains array immutability

## Optimizations
### 1. Single Edit Mode with pendingSave

```
// In TodoContext
pendingSave: false,
setPendingSave: () => {}

// In ListItem.jsx
onClick={() => {
  if (isEditable) {
    setPendingSave(false);
    updateTodo(todo.id, {...todo, todoText: newText});
    setIsEditable(false);
  } else {
    if (pendingSave) return; // Prevent multiple edits
    setPendingSave(true);
    setIsEditable((prev) => !prev);
  }
}}
```
#### How it works:
 
-pendingSave is a global boolean in Context   
-When user starts editing a todo, setPendingSave(true) is called   
-Other todo items check pendingSave and prevent editing if true     
-When save is complete, setPendingSave(false) is called  
-Ensures only one todo can be edited at a time   

### 2. Local Storage Persistence

```
// Load todos on component mount
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos && todos.length > 0) {
    setTodos(todos);
  }
}, []);

// Save todos whenever they change
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
});
```

### 3. Performance Optimizations
-**Functional Updates**: All state updates use functional form for consistency  
-**Minimal Re-renders**: Context provides only necessary state and functions  
-**Efficient Updates**: Array methods (map, filter) for optimal performance   


## Context API Integration

### Context Definition

```
export const TodoContext = createContext({
  todos: [],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
  pendingSave: false,
  setPendingSave: () => {}
});
```

### Context Provider
```
<TodoContextProvider value={{ 
  todos, 
  addTodo, 
  updateTodo, 
  deleteTodo, 
  toggleComplete, 
  pendingSave, 
  setPendingSave 
}}>
 {/* Application components */}
</TodoContextProvider>
```

### Custom Hook
```
export const useTodoContext = () => {
  return useContext(TodoContext);
};
```

### Usage in Components
```
const { todos, addTodo, pendingSave } = useTodoContext();   
```

## State Management Flow   
1. **Global State**: All todo data and methods in Context  

2. **Local State**: UI-specific state (edit mode, input values) in components

3. **Synchronization**: Local storage automatically syncs with global state

4. **Validation**: Prevent invalid operations (empty todos, multiple edits)

## UI/UX Features
-**Rainbow Text Animation**: Color-changing header text  
-**Custom Checkboxes**: styled checkboxes with hover effects  
-**Gradient Backgrounds**: Beautiful color schemes  
-**Smooth Transitions**: CSS transitions for interactions  
-**Responsive Design**: Flexbox-based layout  
-**Visual Feedback**: Different styles for completed vs active todos  

## Getting Started
```
Install dependencies:

npm install
Start development server:


npm run dev
Build for production:


npm run build
```

## Key Learnings:

-This project demonstrates:    
-Advanced React Context patterns   
-Efficient state management strategies    
-CRUD operation best practices    
-Performance optimization techniques    
-Clean component architecture   
-Local storage integration    
-User experience considerations    

The application showcases how to build a production-ready React application with proper state management, error prevention, and optimal user experience.
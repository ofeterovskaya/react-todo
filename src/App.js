import React, {useState, useEffect} from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import InputWithLabel from "./InputWithLabel";

function useSemiPersistentState() {
  const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList")) || [];
  const [todoList, setTodoList] = useState(savedTodoList);

  useEffect(() => {
    localStorage.setItem ("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
    return [todoList,setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo (newTodo) {
    // setTodoList ([...todoList, newTodo])
    setTodoList(prevTodoList => ([ ...prevTodoList, newTodo ]))
  }  
  
  function removeTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1 >To Do List</h1>
      <AddTodoForm onAddTodo = {addTodo}/>
      <TodoList todoList = {todoList} onRemoveTodo={removeTodo}/>      
    </>
    );
}

export default App;

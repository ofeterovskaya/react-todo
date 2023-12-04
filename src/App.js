import React, {useState, useEffect} from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import InputWithLabel from "./InputWithLabel";

// function useSemiPersistentState() {
//   const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList")) || [];
//   const [todoList, setTodoList] = useState(savedTodoList);

//   useEffect(() => {
//     localStorage.setItem ("savedTodoList", JSON.stringify(todoList));
//   }, [todoList]);
//     return [todoList,setTodoList];
// }


function App() {
   const [todoList, setTodoList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [workInProgress, serWorkInProgress] = useState(true);


   //async with Promise, resolve, setTime when refresh page in 2 sec  the saved item appears in the list
   useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
          },
        });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  //Add Loading State
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);


   function addTodo (newTodo) {
    // setTodoList ([...todoList, newTodo]) USE PREVTODO!!!
    setTodoList(prevTodoList => ([ ...prevTodoList, newTodo ]))
  }  
  
  function removeTodo(id) {
    // setTodoList(prevTodoList.filter((todo) => todo.id !== id));
    setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
  };

  return (
    <>
      
      <h1 >To Do List</h1>
      <AddTodoForm onAddTodo = {addTodo}/>
      {/* Create Conditional Loading Indicator loading message is visible in 2 seconds loading disappears but the Todo List visible */}
      {isLoading ? (
          <p>Loading...</p>
      ) : (
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
          )}   
    {workInProgress && <p>Work in progress...</p>}
    </>
    );
}

export default App;

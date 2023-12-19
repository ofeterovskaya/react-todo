import {useState, useEffect} from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
//import InputWithLabel from "./InputWithLabel";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = async() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch (url, options);
      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
          throw new Error(message);
      }
      const data = await response.json();
     
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,      
      }));

      setTodoList(todos);
      setIsLoading(false);

    } catch (error) {
      console.log("Error fetching data: ",error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Add Loading State
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);


  const addTodo = newTodo => {
    // setTodoList ([...todoList, newTodo]) USE PREVTODO!!!
    setTodoList(prevTodoList => ([ ...prevTodoList, newTodo ]))
  }  
  
  const removeTodo = id => {
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

    </>
    );
}

export default App;

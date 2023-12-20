import {useCallback, useState, useEffect} from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    } ;

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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //Add Loading State
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);


  const addTodo = async(newTodo) => {
    // setTodoList ([...todoList, newTodo]) USE PREVTODO!!!
   // setTodoList(prevTodoList => ([ ...prevTodoList, newTodo ]))
   await postTodo(newTodo);
  
  }  
  const postTodo = async (newTodo) => {
    try {
      const airtableData = {
        fields: {
          title: newTodo.title
        },
      };
  
      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          },
          body: JSON.stringify(airtableData),
        }
      );
  
      if (!response.ok) {
        const message = `Error has ocurred:${response.status}`;
        throw new Error(message);
      }
  
      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const removeTodo = async(id) => {
    await deleteTodo(id)
  };

  const deleteTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              </>
            )
          }
        />
  
        <Route
          path="/new"
          element={
            <>
              <h1>New Todo List</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

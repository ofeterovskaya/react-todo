import { useCallback, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import Toggle from "./components/Toggle.js";
import styles from "./components/TodoListItem.module.css";
// import InputWithLabel from './components/InputWithLabel';
// import styles from './components/TodoListItem.module.css';

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  //Toggle btn
  const [isDarkMode, setIsDarkMode, toggle, setToggle] = useState(false);
  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  //Checkbox
  const [checked, setChecked] = useState(false);
  function handleChange(e) {
    setChecked(e.target.checked);
  }

  const fetchData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };
    try {
      const response = await fetch(url, options);
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
      console.log("Error fetching data: ", error);
      setIsLoading(false);
    }
  }); //getting warner abt array React Hook useCallback has a missing dependency: 'url'. Either include it or remove the dependency array

  useEffect(() => {
    fetchData();
  }, []);

  //Add Loading State
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // Adding new todo items function
  const addTodo = async (newTodo) => {
    // Define Airtable data format for the POST request
    const airtableData = {
      fields: {
        title: newTodo.title,
      },
    };
    // Define the URL for adding a new todo
    //const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;

    //  Define access credentials for POST request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    };

    try {
      // Send a POST request to add a new todo. Fetch data from the API
      const response = await fetch(url, options);

      // Check if the response is not successful
      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }

      // Parse the JSON response and update the todoList state

      // const dataResponse = await response.json();
      // return dataResponse; didn't print out on the page

      const addedTodo = await response.json();
      setTodoList([
        ...todoList,
        { id: addedTodo.id,
          title: addedTodo.fields.title },
      ]);

      // Handle errors during adding a todo
    } catch (error) {
      console.log("Error fetching data:", error.message);
      return null;
    }
  };

  //Delete function

  // const removeTodo = async(id) => {
  //   await deleteTodo(id)
  // };

  const deleteTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`;
    //console.log(url);

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`);
      }
      fetchData(); //deleting items from todo list
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
                {/* //Toggle btn is in progress */}
                <div className={styles.Toggle}>
                  <Toggle
                    toggle={toggle}
                    handleToggleChange={handleToggleChange}
                    onSwitch={setIsDarkMode}
                  />
                </div>

                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList todoList={todoList} onRemoveTodo={deleteTodo} />
              </>
            )
          }
        />

        <Route
          path="/new"
          element={
            <>
              <div>
                <Toggle isDarkMode={isDarkMode} />
              </div>
              <h1>New Todo List</h1>
              <p>Hello World</p>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

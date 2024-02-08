import { useCallback, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import Toggle from "./components/Toggle";
import styles from "./components/TodoListItem.module.css";
import { P5Wrapper } from "./components/Background";
import background from "./components/Background";
import TodoContainer from './components/TodoContainer'; 

// import InputWithLabel from './components/InputWithLabel';
// import styles from './components/TodoListItem.module.css';
// import Checkbox from "./components/Checkbox"

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Toggle/SwitchMode btn in
  const [isDarkMode, setIsDarkMode, toggle, setToggle] = useState(false);
  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  //Getting data form Airtable Method GET
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
  }, []);

  // Adding new todo items function Method POST
  const addTodo = async (newTodo) => {
    const airtableData = {
      fields: {
        title: newTodo.title,
      },
    };
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
        { id: addedTodo.id, title: addedTodo.fields.title },
      ]);

      // Handle errors during adding a todo
    } catch (error) {
      console.log("Error fetching data:", error.message);
      return null;
    }
  };

  //Checkbox  Method PATCH
  const updateData = useCallback(async (id, newValue) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        // "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      },
      body: JSON.stringify({
        fields: {
          CheckBox: newValue.Checkbox,
        },
      }),
    };

    console.log(`Updating record with id: ${id}, newValue: ${newValue}`);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      // console.log(data); // Log the response data to the console
      // console.log(`Updating record with id: ${id}, newValue:`, newValue);
      return data;
    } catch (error) {
      console.log("Error updating data: ", error);
    }
  }, []);

  //Delete items method DELETE
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //Add Loading State
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  //Delete function

  // const removeTodo = async(id) => {
  //   await deleteTodo(id)
  // };

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
                <div className ={styles.mainSection}>
                  <>
                    {/* Dynamic background */}
                    <P5Wrapper sketch={background} />
                  </>

                  <div className={styles.todoSection}>
                    {/* Toggle/SwitchMode btn*/}
                    <div
                      className={`${
                        isDarkMode
                          ? styles["dark-theme"]
                          : styles["light-theme"]
                      }`}
                    >
                      <div className={styles.Toggle}>
                        <Toggle
                          toggle={toggle}
                          handleToggleChange={handleToggleChange}
                          onSwitch={setIsDarkMode}
                        />
                      </div>

                      <h1>Todo List</h1>
                      <TodoContainer 
                        // loading={loading}
                        // setLoading={setLoading}
                        todoList={todoList}
                        setTodoList={setTodoList}/>

                      <AddTodoForm onAddTodo={addTodo} />

                      <TodoList
                        todoList={todoList}
                        onRemoveTodo={deleteTodo}
                        onUpdateTodo={updateData}
                      />
                    </div>
                  </div>
                </div>
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

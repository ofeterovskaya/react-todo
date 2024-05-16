//manages the state and behavior of todo list. It interacts with an Airtable API to fetch, add, delete, and update todo items.
//It also handles the sorting of the todo list and the switching between dark and light modes.

import React, { useState, useEffect, useCallback } from "react";
import TodoView from "./TodoView";
//import TodoList from "./TodoList";
//import PropTypes from "prop-types";
//import AddTodoForm from "./AddTodoForm";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
//import styles from "./TodoListItem.module.css";
// import Toggle from "./Toggle";


const AirtableUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

function TodoContainer({ isDarkMode, handleSwitch }) {
  //Switching between dark and light mode isDarkMode, handleSwitch
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc"); // sorting with JavaScript

  // Define the fetchData function GET method
  const fetchData = useCallback(async () => {
    // Define the options for the fetch request GET method
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
    };

    // Define the URL for the Airtable API
    try {
      const response = await fetch(AirtableUrl, options);
      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();

      // Check if the response contains any records
      if (data.records) {
        // Update the todoList state with the records
        setTodoList(
          data.records.map((record) => ({
            title: record.fields.title,
            id: record.id,
          }))
        );
      }

      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data: ", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    };

    try {
      // Send a POST request to add a new todo. Fetch data from the API
      const response = await fetch(AirtableUrl, options);

      // Check if the response is not successful
      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }

      const addedTodo = await response.json();
      console.log(addedTodo);
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        { id: addedTodo.id, title: addedTodo.fields.title },
      ]);
      //  update the local state directly

      // Handle errors during adding a todo
    } catch (error) {
      console.log("Error fetching data:", error.message);
      return null;
    }
  };

  //Delete items method DELETE
  const removeTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${AirtableUrl}/${id}`, options);
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

  //Checkbox  Method PATCH
  const updateData = useCallback(async (id, newValue) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        // "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      },
      body: JSON.stringify({
        fields: {
          CheckBox: newValue.CheckBox,
        },
      }),
    };

    console.log(`Updating record with id: ${id}, newValue: ${newValue}`);
    try {
      const response = await fetch(`${AirtableUrl}/${id}`, options);
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

  // Sorting by JavaScript
  //   The sorting order is determined by the sortOrder state variable.
  //   After sorting, the sorted list is set as the new state for todoList.
  //

  // toggle the sort order from "asc" to "desc" and vice versa
  const handleSortToggle = () =>
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));

  // listen for the "sortOrder" changes and resort the "todoList" as a side effect
  useEffect(() => {
    setTodoList((prevTodoList) => {
      return prevTodoList.sort((todoA, todoB) => {
        // when you use a "?." after a property, it's called
        // "optional chaining" which attempts to access a
        // potentially undefined property of an Object or Array
        const titleA = todoA.title?.toUpperCase();
        const titleB = todoB.title?.toUpperCase();

        if (titleA === titleB) return 0;

        if (titleA < titleB) return sortOrder === "asc" ? -1 : 1;

        return sortOrder === "asc" ? 1 : -1;
      });
    });
  }, [sortOrder]);

  return (
    <>
      <TodoView
        fetchData={fetchData}
        onAddTodo={addTodo}
        removeTodo={removeTodo}
        isLoading={isLoading}
        todoList={todoList}
        sortOrder={sortOrder}
        updateData={updateData}
        setSortOrder={setSortOrder}
        isDarkMode={isDarkMode}
        handleSwitch={handleSwitch}
        handleSortToggle={handleSortToggle}
      />
    </>
  );
}

export default TodoContainer;

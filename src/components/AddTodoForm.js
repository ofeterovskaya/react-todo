import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodo.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo, isDarkMode }) {
  //create
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    //update
    setTodoTitle(newTodoTitle);
  }
  // In the handleAddTodo function, remove the todoTitle variable and update
  //onAddTodo callback handler to pass our todoTitle state variable instead
  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({
      title: todoTitle,
    });
    //pass title and id
    setTodoTitle("");
  }
  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        type="text"
        name="title"
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
        autoFocus
      >
        New To Do
      </InputWithLabel>
      &nbsp;
      <button
        type="submit"
        className={`${styles.AddButton} ${isDarkMode ? styles.DarkThemeAddButton : styles.LightThemeAddButton}`}
      >
        Add
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AddTodoForm;

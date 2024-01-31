import { useState, useEffect, useRef } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo }) {
  //create
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    //update
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({
      title: todoTitle,
      //generate a unique number
      // id: Date.now(),
    });
    //pass title and id
    setTodoTitle("");
  }
  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        type="text"
        // placeholder = "New Todo"
        name="title"
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
        autoFocus
      >
        New To Do
      </InputWithLabel>
      &nbsp;
      <button type="submit" className={styles.AddButton}>
        Add
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;

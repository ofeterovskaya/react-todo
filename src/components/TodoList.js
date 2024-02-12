// TodoList receives a list of todos and two functions (onRemoveTodo and updateData) as props,
// and it maps over the todos to create a TodoListItem for each one.

import TodoListItem from "./TodoListItem";
import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoList.module.css";

const TodoList = ({ todoList, onRemoveTodo, updateData }) => {
  return (
    <div>
      <ul className={styles.TodoListContent}>
        {todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            task={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={updateData}
          />
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  onRemoveTodo: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};

export default TodoList;

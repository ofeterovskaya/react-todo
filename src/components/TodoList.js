import TodoListItem from "./TodoListItem";
import { useState } from "react";
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <ul className={styles.TodoListContent}>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} task={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  onRemoveTodo: PropTypes.func.isRequired,
}

export default TodoList;
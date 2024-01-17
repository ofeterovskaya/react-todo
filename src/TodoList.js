import TodoListItem from "./TodoListItem";
import { useState } from "react";
import styles from "./TodoListItem.module.css";

const TodoList = ({todoList, onRemoveTodo}) => {
  return (
    <ul className = {styles.TodoListContent}>
      {todoList.map ((todo) => (          
        <TodoListItem 
          key={todo.id}
          task={todo}
          onRemoveTodo={onRemoveTodo}
        />
      ))}        
    </ul>
  );
};
export default TodoList;
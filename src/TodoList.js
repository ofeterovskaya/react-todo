import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList ({todoList}) {
  return (
    <ul>
      {todoList.map ((todo) => (          
        <TodoListItem key={todo.id} task={todo} />
      ))}        
    </ul>
  );
};
export default TodoList;
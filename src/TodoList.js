import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
    {
      id: 1,
      title: 'Read assignment',
    },
    {
      id: 2,
      title: 'Complete assignment',
    },
    {
      id: 3,
      title: 'Submit assignment',
    },
  ];

function TodoList() {
    return (
        <ul>
            {todoList.map(item => {
              return(
                <TodoListItem key={item.id} item={item} todo={todoList}/>
              );
            })}        
        </ul>
    );
};
export default TodoList;
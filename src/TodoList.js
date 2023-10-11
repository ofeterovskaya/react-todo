import React from "react";

let todoList = [
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
                return (
                    <li key={item.id}>{item.title}</li>                    
                );
            })}        
        </ul>
    );
};
export default TodoList;
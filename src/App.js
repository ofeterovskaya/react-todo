import React from 'react';

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

function App() {
  return (
    <div>
      <h1 >To Do List</h1>
      <ul>
        {todoList.map(item => {
          return (
            <li key={item.id}><hr></hr>{item.title}</li>
            
          );
        })}        
      </ul>
    </div>
  );
}

export default App;

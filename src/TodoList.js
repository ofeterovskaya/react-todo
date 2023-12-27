import TodoListItem from "./TodoListItem";

const TodoList = ({todoList, onRemoveTodo}) => {
  return (
    <ul>
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
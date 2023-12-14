
function TodoListItem({task, onRemoveTodo}) {
    const {id} = task;
    
    return(
        <li>
            {task.title}
            &nbsp;
            <button type = "button" onClick = {() => onRemoveTodo(id)}>
                Remove
            </button>
        </li>
    );
};
export default TodoListItem;


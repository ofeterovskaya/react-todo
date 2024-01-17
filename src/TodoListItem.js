import { useState } from "react";
import styles from './TodoListItem.module.css';

function TodoListItem({task, onRemoveTodo}) {
    const {id} = task;
    
    return(
        <li className = {styles.ListItem}>
            {task.title}
            &nbsp;
            <button type = "button" onClick = {() => onRemoveTodo(id)}>
                Remove
            </button>
        </li>
    );
};
export default TodoListItem;


import { useState } from "react";
import styles from "./TodoListItem.module.css";
// import {image as Trashcan} from "./Trashcan.png";
import PropTypes from "prop-types";

function TodoListItem({ task, onRemoveTodo }) {
  const { title, id } = task;

  //for future checkbox
  const [isChecked, setIsChecked] = useState(false);

  return (
    <li >
      {/* //checkbox in progress */}
      <input className ={styles.CheckBox}
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      <label className={styles.ListItem}
        htmlFor={id}
        style={{ textDecoration: isChecked ? "line-through" : "none" }}
      ></label>
      {task.title}
    
      <button type="button" onClick={() => onRemoveTodo(id)}>
        Delete
        {/* <Trashcan/> */}
      </button>
      
    </li>
  );
}

// Define propTypes for TodoListItem
TodoListItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;

import { useState } from "react";
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem({ task, onRemoveTodo }) {
  const { title, id } = task;

  //for future checkbox
//   const [isChecked, setIsChecked] = useState(false);

  return (
    <li className={styles.ListItem}>
        {/* //checkbox in progress */}
    {/* //<input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        htmlFor={id}
        style={{ textDecoration: isChecked ? "line-through" : "none" }}
      ></label> */}
      {task.title}
      &nbsp;
      <button type="button" onClick={() => onRemoveTodo(id)}>
        Remove
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
    onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;

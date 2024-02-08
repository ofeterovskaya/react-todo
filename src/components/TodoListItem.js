import { useState } from "react";
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import style from "./Checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoListItem({ task, onRemoveTodo, onUpdateTodo }) {
  const { id, title } = task;
  //  console.log(typeof onUpdateTodo)
  const [isChecked, setIsChecked] = useState(task.completed || false); //checkbox

  const handleCheckboxChange = async () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    await onUpdateTodo(id, { Checkbox: newIsChecked });
  };

  // Use the checked status to determine whether to cross out the todo item
  const itemStyle = isChecked ? { textDecoration: "line-through" } : {};

  return (
    <li>
      <div style={itemStyle}>
      
        <input
          className={style.checkbox_linethrough}
          id={id} // attribute was added to the input element to fix the issue with the label's for attribute not matching any form field id.
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />

        <label className={styles.ListItem} htmlFor={id}></label>
        {title}
        <button
          className={styles.DeleteButton}
          type="button"
          onClick={() => onRemoveTodo(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
          {/* Delete */}
        </button>
      </div>
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

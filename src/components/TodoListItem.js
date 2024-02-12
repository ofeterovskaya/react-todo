//  TodoListItems receives a task object and two functions (onRemoveTodo and updateData) as props.
// It uses the useState hook to manage the checked state of the checkbox,
// and it updates this state and calls updateData when the checkbox is clicked.

import { useState } from "react";
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import style from "./Checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoListItem({ task, onRemoveTodo, isDarkMode, onUpdateTodo, }) {
  const { id, title } = task;
  const [isChecked, setIsChecked] = useState(task.completed || false); //checkbox

  const handleCheckboxChange = async () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    await onUpdateTodo(id, {  CheckBox: newIsChecked });
  };

  // Use the checked status to determine whether to cross out the todo item
  const itemStyle = isChecked ? { textDecoration: "line-through" } : {};

  return (
    <li>
      <div>
        <input
          className={style.checkbox_linethrough}
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />

        <label className={styles.ListItem} htmlFor={id} style={itemStyle}>
          {title}
        </label>
        <button
          className={`${styles.DeleteButton} ${
            isDarkMode
              ? styles.darkThemeDeleteButton
              : styles.lightThemeDeleteButton
          }`}
          type="button"
          onClick={() => onRemoveTodo(id)}
        >
          <FontAwesomeIcon className={styles.trashIcon} icon={faTrash} />
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

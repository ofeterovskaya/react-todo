import React from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.css";

const Checkbox = ({  isChecked, setIsChecked, text, id, updateData }) => {
  const handleChecked = async () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    await updateData(id, { checked: newIsChecked });
  };

  return (
    <div className={styles.checkbox_linethrough}>
      <label htmlFor="checkbox">
        <input
          className={styles.CheckBox}
          type="checkbox"
          id="checkbox"
          onChange={handleChecked}
          checked={isChecked}
        />
        <span className={isChecked ? styles.crossedOut : ''}>{text}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  setIsChecked: PropTypes.func,
  text: PropTypes.string,
  id: PropTypes.string,
};

export default Checkbox;
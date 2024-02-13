import React, { useState } from "react";
import PropTypes from "prop-types";
import SharedStyles from "./SharedStyles.module.css";

const Toggle = ({ onSwitch, className }) => {
  const [toggle, setToggle] = useState(false);

  const switchToggle = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    onSwitch(newToggle);
  };

  return (
    <div className={toggle ? SharedStyles.darkTheme : SharedStyles.lightTheme}>
      <button
        onClick={switchToggle}
        className={`${SharedStyles.Toggle} ${SharedStyles.modeButton} ${
          toggle ? SharedStyles.darkTheme : SharedStyles.lightTheme
        } ${className}`}
      >
        {toggle ? "Light mode" : "Dark Mode"}
      </button>
    </div>
  );
};

Toggle.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Toggle;

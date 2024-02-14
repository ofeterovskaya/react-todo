import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function InputWithLabel({
  type,
  id,
  name,
  value,
  onChange,
  children,
  isFocused,
}) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.bool,
};

export default InputWithLabel;

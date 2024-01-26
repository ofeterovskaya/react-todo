import { useEffect, useRef} from "react";
import styles from "./TodoListItem.module.css";

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
      <label className = {styles.LabelItem}htmlFor={id}>{children}</label>
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

export default InputWithLabel;
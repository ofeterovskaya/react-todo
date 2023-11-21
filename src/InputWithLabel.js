import { useEffect, useRef} from "react";

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
        ></input>
    </>
  );
}

export default InputWithLabel;
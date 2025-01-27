import React, { forwardRef } from "react";

// "Warning: Function components cannot be given refs. Attempts to access this ref will fail."
// Daher muss ich hier ein forwardRef verwenden =(
const InputField = forwardRef((props, ref) => {
  //const { type, name, placeholder, onKeyPress } = props; // destructuring Props
  return (
    <input
      className="w-80 h-11 pl-2 rounded-md text-xs text-white bg-bodyMain placeholder-white placeholder-opacity-60"
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      ref={ref}
      onKeyDown={props.onKeyDown}
    />
  );
});

export default InputField;

import React from "react";

function BigBlueButton(props) {
  return (
    <button
      className="w-80 h-9 text-myWhite rounded-md bg-blue-500 hover:text-gray-600"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default BigBlueButton;

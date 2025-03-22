import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/darkModeSlice";
import { FaSun } from "react-icons/fa";

function DarkModeToggler() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state
  const dispatch = useDispatch(); // Aktion auslösen

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())} // Zustand toggeln
      className={`p-2 rounded-full ${
        darkMode ? "bg-zinc-600 text-white" : "bg-zinc-300 text-black"
      }`}
    >
      <FaSun />
    </button>
  );
}

export default DarkModeToggler;

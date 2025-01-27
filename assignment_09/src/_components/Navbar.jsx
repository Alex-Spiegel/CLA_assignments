import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggler from "./DarkModeToggler";
import { useSelector } from "react-redux";

function Navbar() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle Dropdown
  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <nav
      className={`mx-auto px-5 py-1 h-12 flex justify-between ${
        darkMode ? "bg-navDark text-white" : "bg-navLight text-black"
      }`}
    >
      {/* left div */}
      <div className="flex gap-4 items-center font-semibold ">
        <div className="flex items-center">
          <img
            className="h-8 pr-2"
            src="./images/logo.svg"
            alt="CodeCla-logo"
          />
          <p>CLA</p>
        </div>
        <Link to="/challenges" className="font-semibold hover:underline">
          Challenges
        </Link>
        <Link to="/leaderboard" className="font-semibold hover:underline">
          Leaderboard
        </Link>
      </div>

      {/* right div */}
      <div className="flex items-center gap-2">
        <div className="relative dropdown-container">
          <img
            className="h-8 rounded-full cursor-pointer"
            src="https://randomuser.me/api/portraits/men/99.jpg"
            alt="profile-pic"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div
              className={`absolute right-0 mt-2 shadow-md rounded-md text-sm ${
                darkMode ? "bg-navDark" : "bg-navLight"
              }`}
            >
              <Link to="/profile" className="block px-4 py-2 hover:bg-purple01">
                Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-purple01"
                onClick={() => {
                  // Logout Logik HIERHER
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <p className="text-sm">Michael Williams</p>
        <DarkModeToggler /> {/* Hier wird der Toggler eingebaut */}
      </div>
    </nav>
  );
}

export default Navbar;

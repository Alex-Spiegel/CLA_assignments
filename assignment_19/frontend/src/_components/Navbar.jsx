import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggler from "./DarkModeToggler";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout, clearToken } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetMyProfileQuery } from "../api/gqlApi";

function Navbar() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data } = useGetMyProfileQuery(); // API-Query ausführen

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
        <Link to="/" className="flex items-center">
          <img className="h-8 pr-2" src="/images/logo.svg" alt="CodeCla-logo" />
          <p>CLA</p>
        </Link>
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
            src={data?.getMyProfile?.avatar}
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
                  dispatch(logout()); // Redux: isAuthenticated = false
                  dispatch(clearToken()); // Token entfernen + localStorage löschen
                  navigate("/signin"); // Zurück zur Startseite
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <p className="text-sm">
          {data?.getMyProfile?.first_name ?? "Coder"}{" "}
          {data?.getMyProfile?.last_name ?? ""}
        </p>
        <DarkModeToggler /> {/* Hier wird der Toggler eingebaut */}
      </div>
    </nav>
  );
}

export default Navbar;

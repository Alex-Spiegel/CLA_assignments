import React from "react";
import Navbar from "../_components/Navbar";
import ChallengeView from "../_components/ChallengeView";
import { useSelector } from "react-redux";

function ChallengeDetail() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-mainDark" : "bg-mainLight"}`}
    >
      <Navbar />
      <main className="px-6 py-4">
        <ChallengeView />
      </main>
    </div>
  );
}

export default ChallengeDetail;

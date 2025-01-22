import React from "react";
import { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { FaRegHourglass } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useSelector } from "react-redux";

const challenges = [
  {
    id: 145,
    title: "Two-sum",
    description: "...", // Not used here
    category: "Data structure",
    Difficulty: "Easy",
    status: "Completed",
    solutionRate: "45%",
    maintainer: "Goerge Harvy", // Not used here
  },
  {
    id: 146,
    title: "Fibonacci series",
    description: "...", // Not used here
    category: "Data structure",
    Difficulty: "Moderate",
    status: "Attempted",
    solutionRate: "45%",
    maintainer: "Goerge Harvy", // Not used here
  },
  {
    id: 147,
    title: "Skyline problem",
    description: "...", // Not used here
    category: "Data structure",
    Difficulty: "Hard",
    status: "Pending",
    solutionRate: "45%",
    maintainer: "Goerge Harvy", // Not used here
  },
];

function ChallengesList() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state

  // Initialer State: Leeres Objekt für tooltips
  const [tooltipVisible, setTooltipVisible] = useState({});

  const handleMouseEnter = (id) => {
    // Setze nur den Tooltip für das angegebene id auf true
    setTooltipVisible((prevState) => {
      const newState = { ...prevState };
      newState[id] = true; // Tooltip für das angeklickte Element sichtbar
      return newState;
    });
  };

  const handleMouseLeave = (id) => {
    // Setze nur den Tooltip für das angegebene id auf false
    setTooltipVisible((prevState) => {
      const newState = { ...prevState };
      newState[id] = false; // Tooltip für das angeklickte Element unsichtbar
      return newState;
    });
  };

  return (
    <div
      className={`max-h-96 px-4 py-6 mt-8 overflow-y-auto rounded-md shadow-md ${
        darkMode ? "bg-purple02" : "bg-zinc-200"
      }`}
    >
      <table className="min-w-full table-auto border-collapse">
        <thead
          className={`text-lg ${darkMode ? "bg-purple01" : "bg-zinc-400"}`}
        >
          <tr>
            <th className="px-4 py-2 font-normal">Status</th>
            <th className="px-4 py-2 font-normal">Title</th>
            <th className="px-4 py-2 font-normal">Category</th>
            <th className="px-4 py-2 font-normal">Difficulty</th>
            <th className="px-4 py-2 font-normal">Solution Rate</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => {
            let statusContent;
            let tooltipText = "";

            if (challenge.status === "Completed") {
              statusContent = (
                <BsCheck2Circle className="text-3xl text-green-500" />
              );
              tooltipText = "Completed";
            }
            if (challenge.status === "Attempted") {
              statusContent = (
                <LuFileSpreadsheet className="text-3xl text-blue-500" />
              );
              tooltipText = "Attempted";
            }
            if (challenge.status === "Pending") {
              statusContent = (
                <FaRegHourglass className="text-3xl text-amber-500" />
              );
              tooltipText = "Pending";
            }

            let difficultyContent;

            switch (challenge.Difficulty) {
              case "Easy":
                difficultyContent = (
                  <span className="px-3 py-0.5 text-sm bg-green-400 rounded-full shadow-md">
                    Easy
                  </span>
                );
                break;
              case "Moderate":
                difficultyContent = (
                  <span className="px-3 py-0.5 text-sm bg-yellow-400 rounded-full shadow-md">
                    Moderate
                  </span>
                );
                break;
              case "Hard":
                difficultyContent = (
                  <span className="px-3 py-0.5 text-sm bg-red-400 rounded-full shadow-md">
                    Hard
                  </span>
                );
                break;
              default:
                difficultyContent = (
                  <span className="px-3 py-0.5 text-sm bg-slate-400 rounded-full shadow-md">
                    Unknown
                  </span>
                );
            }

            return (
              <tr
                key={challenge.id}
                className={`border-b text-center ${
                  darkMode ? "border-purple01" : "border-MyLightGray"
                }`}
              >
                <td
                  className="relative px-4 py-2 flex items-center justify-center"
                  onMouseEnter={() => handleMouseEnter(challenge.id)}
                  onMouseLeave={() => handleMouseLeave(challenge.id)}
                >
                  {statusContent}
                  {tooltipVisible[challenge.id] && (
                    <div className="absolute bottom-4 p-1 text-xs text-white bg-zinc-500 rounded-md">
                      {tooltipText}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{challenge.title}</td>
                <td className="px-4 py-2">{challenge.category}</td>
                <td className="px-4 py-2">{difficultyContent}</td>
                <td className="px-4 py-2">{challenge.solutionRate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ChallengesList;

import React from "react";
import { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { FaRegHourglass } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useGetChallengesByCategoryQuery } from "../api/gqlApi"; // GraphQL Hook importieren
import { useNavigate } from "react-router-dom";

function ChallengesList(selectedCategory) {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state
  const navigate = useNavigate(); // holt Hook für Navigation

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

  //===========================
  // CATEGORY FORMATTER
  //===========================
  // Somehow selectedCategory turns into an object and I dont know why.
  // That's why we use a formatter here.
  const formattedCategory =
    selectedCategory?.selectedCategory ?? selectedCategory;

  // Wenn formattedCategory existiert UND ein String ist → Speichere den Wert in categoryFilter.
  // Andernfalls setze categoryFilter auf null.
  const categoryFilter =
    formattedCategory && typeof formattedCategory === "string"
      ? formattedCategory
      : null;

  const { data, error, isLoading } = useGetChallengesByCategoryQuery({
    category: categoryFilter,
  });

  if (isLoading) return <p>Loading challenges...</p>;
  if (error) return <p>Error loading challenges: {error.message}</p>;
  if (!data?.getChallengesByCategory.length) return <p>No challenges found</p>;

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
            <th className="px-4 py-2 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.getChallengesByCategory.map((challenge) => {
            //===========================
            // STATUS FORMATTER
            //===========================
            let statusContent;
            let tooltipText = "";

            switch (challenge.status[0]?.status) {
              case "COMPLETED":
                statusContent = (
                  <BsCheck2Circle className="text-3xl text-green-500" />
                );
                tooltipText = "Completed";
                break;
              case "ATTEMPTED":
                statusContent = (
                  <LuFileSpreadsheet className="text-3xl text-blue-500" />
                );
                tooltipText = "Attempted";
                break;
              case "WAITING":
                statusContent = (
                  <FaRegHourglass className="text-3xl text-amber-500" />
                );
                tooltipText = "Pending";
                break;
              default:
                statusContent = (
                  <FaRegHourglass className="text-3xl text-gray-500" />
                );
                tooltipText = "Unknown";
            }

            //===========================
            // DIFFICULTY FORMATTER
            //===========================
            let difficultyContent;

            switch (challenge.level) {
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
                key={challenge._id}
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
                <td className="px-4 py-2">{challenge.solution_rate}%</td>
                <td className="px-4 py-2">
                  <button
                    className="px-2 py-1 text-sm text-white bg-blue-500 rounded-md shadow-md"
                    onClick={() => navigate(`/challenge/${challenge._id}`)} // Navigiere zur Challenge
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ChallengesList;

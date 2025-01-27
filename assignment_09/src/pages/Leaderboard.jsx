import React from "react";
import Navbar from "../_components/Navbar";
import { useSelector } from "react-redux";

const data = [
  {
    rank: 1,
    first_name: "John",
    last_name: "Doe",
    score: 400,
    solved_challenges: 150,
  },
  {
    rank: 2,
    first_name: "Alice",
    last_name: "Smith",
    score: 350,
    solved_challenges: 140,
  },
  {
    rank: 3,
    first_name: "Emma",
    last_name: "Johnson",
    score: 320,
    solved_challenges: 135,
  },
];

function Leaderboard() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "text-myWhite bg-mainDark" : "text-black bg-mainLight"
      }`}
    >
      <Navbar />
      <div className="px-2">
        <h1 className="py-3 text-4xl">Leaderboard</h1>

        <table className="min-w-full table-auto border-collapse">
          <thead
            className={`text-lg ${darkMode ? "bg-purple01" : "bg-zinc-400"}`}
          >
            <tr>
              <th className="px-4 py-2 font-normal">Rank</th>
              <th className="px-4 py-2 font-normal">Name</th>
              <th className="px-4 py-2 font-normal">Score</th>
              <th className="px-4 py-2 font-normal">Solved Challenges</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr
                  key={item.index}
                  className={`border-b text-center ${
                    darkMode ? "border-purple01" : "border-MyLightGray"
                  }`}
                >
                  <td className="px-4 py-2">{item.rank}</td>
                  <td className="px-4 py-2">
                    {item.first_name} {item.last_name}
                  </td>
                  <td className="px-4 py-2">{item.score}</td>
                  <td className="px-4 py-2">{item.solved_challenges}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;

import React from "react";
import { useSelector } from "react-redux";

const CodersData = [
  {
    id: 101,
    first_name: "Alice",
    last_name: "Johnson",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    score: 350,
  },
  {
    id: 102,
    first_name: "Bob",
    last_name: "Smith",
    avatar_url: "https://i.pravatar.cc/150?img=2",
    score: 320,
  },
  {
    id: 103,
    first_name: "Emily",
    last_name: "Davis",
    avatar_url: "https://i.pravatar.cc/150?img=5",
    score: 290,
  },
  {
    id: 104,
    first_name: "Michael",
    last_name: "Brown",
    avatar_url: "https://i.pravatar.cc/150?img=4",
    score: 270,
  },
];

function CoderCard({ imgUrl, firstName, lastName, amount }) {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state

  return (
    //   the whole bar
    <div
      className={`p-2 my-3 flex justify-between items-center rounded-md shadow-md ${
        darkMode ? "bg-purple01" : "bg-gray-200"
      }`}
    >
      {/* avatar & names */}
      <div className="flex flex-nowrap items-center gap-3">
        <img className="h-10 rounded-full" src={imgUrl} alt={firstName} />
        <p className="font-semibold">
          {firstName} {lastName}
        </p>
      </div>
      <p>Score: {amount}</p>
    </div>
  );
}

function TopKCodersList() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state

  return (
    <div
      className={`p-3 my-2 rounded-md shadow-md ${
        darkMode ? "bg-purple02" : "bg-inherit"
      }`}
    >
      <h2 className="text-center text-xl">Top 4 Coders</h2>
      {CodersData.map((item, index) => (
        <CoderCard
          key={index}
          imgUrl={item.avatar_url}
          firstName={item.first_name}
          lastName={item.last_name}
          amount={item.score}
        />
      ))}
    </div>
  );
}

export default TopKCodersList;

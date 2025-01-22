import React from "react";
import { useSelector } from "react-redux";

const trendingCategories = [
  {
    category: "Graphs",
    count: 100,
  },
  {
    category: "Stacks",
    count: 45,
  },
  {
    category: "Algorthims",
    count: 20,
  },
  {
    category: "Databases",
    count: 3,
  },
];

function Category({ name, count }) {
  return (
    <span className="p-2 text-zinc-600 bg-zinc-200 rounded-full">
      {name}{" "}
      <span className="px-3 py-0.5 bg-teal-400 rounded-full">{count}</span>
    </span>
  );
}

function TrendingCategoriesBox() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state

  return (
    <div
      className={`p-3 my-2 rounded-md shadow-md ${
        darkMode ? "bg-purple02" : "bg-inherit"
      }`}
    >
      <h2 className="mb-2 text-center text-xl">Trending Categories</h2>
      <div className="flex flex-wrap gap-2">
        {trendingCategories.map((item, index) => (
          <Category key={index} name={item.category} count={item.count} />
        ))}
      </div>
    </div>
  );
}

export default TrendingCategoriesBox;

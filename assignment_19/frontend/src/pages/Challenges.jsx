import React from "react";
import Navbar from "../_components/Navbar";
import CategoriesList from "../_components/CategoriesList";
import ChallengesList from "../_components/ChallengesList";
import TrendingCategoriesBox from "../_components/TrendingCategoriesBox";
import TopKCodersList from "../_components/TopKCodersList";
import { useSelector } from "react-redux";
import { useState } from "react";

function Challenges() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state
  const [selectedCategory, setSelectedCategory] = useState(null); // Kategorie-Status verwalten

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "text-myWhite bg-mainDark" : "text-black bg-mainLight"
      }`}
    >
      <Navbar />
      <div className="flex w-screen">
        {/* left div */}
        <div className="w-3/4 px-2">
          <h1 className="py-3 text-4xl ">Challenges</h1>
          <CategoriesList setSelectedCategory={setSelectedCategory} />
          <ChallengesList selectedCategory={selectedCategory} />
        </div>
        {/* right div */}
        <div className="w-1/4 px-2">
          <TrendingCategoriesBox />
          <TopKCodersList />
        </div>
      </div>
    </div>
  );
}

export default Challenges;

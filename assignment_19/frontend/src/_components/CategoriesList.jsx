import React from "react";
import { useGetAllCategoriesQuery } from "../api/gqlApi"; // GraphQL Hook importieren

// this little "side" component provides the styling for the zu createn items (categories)
function Category({ name, onClick }) {
  return (
    <span
      className="px-3 py-1 text-sm text-zinc-600 bg-zinc-200 rounded-full shadow-md cursor-pointer"
      onClick={() => onClick(name)} // beim Klick, Kategorie setzen
    >
      {name}
    </span>
  );
}

// Hauptkompo, die durch das array mappt und dabei mit der Category-Kompo die Dingens kreiert
function CategoriesList({ setSelectedCategory }) {
  const { data, error, isLoading } = useGetAllCategoriesQuery(); // API-Query ausführen

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl ">Select category</h2>
      <div className="flex gap-3">
        {/* "All"-Button – setzt die Kategorie auf null */}
        <span
          className="px-3 py-1 text-sm text-white bg-zinc-500 rounded-full shadow-md cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </span>
        {/* Mapping fürs Erstellen der Filter-Buttons */}
        {data.getAllCategories.map((category, index) => (
          <Category key={index} name={category} onClick={setSelectedCategory} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;

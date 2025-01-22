import React from "react";

const categories = ["All", "Data structure", "Graphs", "Databases"];

// this little "side" component provides the styling for the zu createn items (categories)
function Category({ name }) {
  return (
    <span className="px-3 py-1 text-sm text-zinc-600 bg-zinc-200 rounded-full shadow-md">
      {name}
    </span>
  );
}

// Hauptkompo, die durch das array mappt und dabei mit der Category-Kompo die Dingens kreiert
function CategoriesList() {
  return (
    <div>
      <h2 className="mb-4 text-xl ">Select category</h2>
      <div className="flex gap-3">
        {categories.map((category, index) => (
          <Category key={index} name={category} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;

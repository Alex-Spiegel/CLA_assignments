import React from "react";

function StatisticsCard({ stat, title }) {
  return (
    <div className="flex flex-col justify-center bg-myWhite border border-1 rounded-md h-16 shadow-lg">
      <p>{stat}</p>
      <p>{title}</p>
    </div>
  );
}

export default StatisticsCard;

import React from "react";

const InfoCard = ({ title, description }) => {
  return (
    <div className="flex items-center gap-1 p-4 border border-MyLightGray rounded-md shadow-lg bg-myWhite">
      <img className="w-5" src="./images/ok.svg" alt="ok" />
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p className="mt2 text-MyLightGray">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;

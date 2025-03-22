import React from "react";
import { useParams } from "react-router-dom";
import { useGetChallengeByIdQuery } from "../api/gqlApi";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbArrowBigLeftLines } from "react-icons/tb";
import { TbArrowBigRightLines } from "react-icons/tb";

function ChallengeView() {
  const darkMode = useSelector((state) => state.darkMode.value); // holt/ liest den darkMode Redux state

  const { id } = useParams(); // ID aus der URL holen
  const { data, error, isLoading } = useGetChallengeByIdQuery({ id });

  if (isLoading)
    return <p className="text-center text-lg">Loading challenge...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error loading challenge: {error.message}
      </p>
    );

  const markdown = JSON.parse(`"${data.getChallengeById.description}"`);

  return (
    <div
      className={`max-w-3xl mx-auto mt-8 p-6 shadow-lg rounded-md ${
        darkMode ? "text-myWhite bg-purple02" : "text-black bg-white"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-4 ${
          darkMode ? "text-myWhite" : "text-black"
        }`}
      >
        {data.getChallengeById.title}
      </h2>

      {/* Markdown-Rendering */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      {/* Challenge Infos */}
      <div
        className={`mt-6 p-4 rounded-md shadow ${
          darkMode ? "text-myWhite bg-MyLightGray" : "text-black bg-gray-100"
        }`}
      >
        <p className="text-lg">
          <strong>Category:</strong> {data.getChallengeById.category}
        </p>
        <p className="text-lg">
          <strong>Difficulty:</strong> {data.getChallengeById.level}
        </p>
      </div>

      {/* Codeblock */}
      <pre className="mt-6 p-4 bg-gray-900 text-white rounded-md text-sm overflow-x-auto">
        {data.getChallengeById.code.code_text.text}
      </pre>

      {/* Button-Leiste */}
      <div className="mt-8 flex justify-between items-center">
        <Link
          to="/challenges"
          className="w-56 px-4 py-2 flex items-center gap-2 rounded-md font-bold bg-purple-600 hover:bg-purple-700 text-white"
        >
          <TbArrowBigLeftLines className="text-2xl" />
          Back to Challenges
        </Link>
        <button className="w-56 px-4 py-2 flex items-center gap-2  rounded-md font-bold bg-purple-600 hover:bg-purple-700 text-white">
          Solve this Challenge
          <TbArrowBigRightLines className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default ChallengeView;

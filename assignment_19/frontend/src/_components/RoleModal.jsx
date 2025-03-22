import React from "react";
import { Link } from "react-router-dom";

function RoleModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-80 h-72 bg-purple-200 text-black p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Choose your role</h2>
        <p className="mb-6">Would you like to join as a Coder or a Manager?</p>
        <div className="flex flex-col gap-3">
          <Link
            to="/signup"
            className="py-2 px-4 rounded-md bg-primary text-myWhite font-bold hover:bg-myWhite hover:text-primary border border-primary"
          >
            Join as Coder
          </Link>
          <Link
            to="/managersignup"
            className="py-2 px-4 rounded-md bg-myWhite text-primary font-bold hover:bg-primary hover:text-myWhite border border-primary"
          >
            Join as Manager
          </Link>
          <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleModal;

// external imports
import React from "react";
import { Route, Routes } from "react-router-dom";
// local imports
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./_components/ProtectedRoute";
import Challenges from "./pages/Challenges";
// assets
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* öffentliche Routen */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Geschützte Routen */}
        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <Challenges />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

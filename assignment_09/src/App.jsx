// external imports
import React from "react";
import { Route, Routes } from "react-router-dom";
// local imports
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProtectedRoute from "./_components/ProtectedRoute";
import Challenges from "./pages/Challenges";
// assets
import "./App.css";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>
      <Routes>
        {/* öffentliche Routen */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        {/* Geschützte Routen */}
        <Route
          path="/challenges"
          element={
            // <ProtectedRoute>
            <Challenges />
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;

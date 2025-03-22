import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProtectedRoute from "./_components/ProtectedRoute";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Leaderboard from "./pages/Leaderboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth()); // ✅ Token aus localStorage holen
  }, []);
  return (
    <>
      <Routes>
        {/* öffentliche Routen */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        {/* Geschützte Routen */}
        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <Challenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <ProtectedRoute>
              <ChallengeDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

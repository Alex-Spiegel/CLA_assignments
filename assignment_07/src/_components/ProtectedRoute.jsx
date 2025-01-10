import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  // useSelector ist ein React-Redux-Hook, um auf den store zuzugreifen. Holt den gesamten Redux-State.
  // Per arguments holt man Teile des states, um sie in einer (anderen) Kompo zu verwenden.
  // unten: Basic usage: useSelector nimmt eine callback-func als Argument entgegen.
  // Diese filtert den Teil des States heraus, den wir brauchen, nämlich state.auth.isAuthenticated.

  // allg. Syntax von useSelector():
  // const selectedData = useSelector((state) => state.someReducer.someProperty);

  // state --> repräsentiert den gesamten Redux-State
  // state.auth --> greift auf den Teil des states zu, der von auth-Reducer verwaltet wird (siehe store.jsx)
  // state.auth.isAuthenticated --> greift auf das specifische Feld "isAuthenticated" zu. Wurde im authSlice definiert
  // Ergebnis (boolean) wird dann der const "isAuthenticated" zugewiesen

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Wenn der Benutzer nicht eingeloggt ist, leite zur Sign-In-Seite weiter
    return <Navigate to="/sign-in" />;
  }

  // Wenn der Benutzer eingeloggt ist, zeige das geschützte Kind-Element
  return children;
}

export default ProtectedRoute;

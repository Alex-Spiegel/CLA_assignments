import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputField from "../_components/InputField";
import BigBlueButton from "../_components/BigBlueButton";
import { useLoginUserMutation } from "../api/gqlApi";
import { login, setToken } from "../redux/authSlice";

function SignIn() {
  const emailRef = useRef(null); // useRef für Email (statt useState)
  const passwordRef = useRef(null); // useRef für Passwort (statt useState)
  const [error, setError] = useState(""); // Für Fehlermeldungen

  const [loginUser] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // event als Parameter hinzufügen
    event.preventDefault();

    // FORMVALIDIERUNG ab hier
    // Hole die aktuellen Values aus den ref-Feldern
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.includes("@")) {
      setError("Your email must contain '@'");
      return; // Validation schlägt fehl, stoppe hier
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters long");
      return; // Validation schlägt fehl, stoppe hier
    }

    // Wenn kein Validierungsfehler, weiter zur...
    // ...AUTHENTIFIZIERUNG ab hier
    try {
      const result = await loginUser({ email, password }).unwrap();

      if (result) {
        dispatch(setToken(result.loginUser)); // Token speichern
        dispatch(login()); // authSlice: isAuthenticated = true
        navigate("/challenges"); // Weiterleitung
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error");
    }
  };

  // handle pressing Enter while in input field
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event); // Trigger handleSubmit when Enter is pressed
    }
  };

  return (
    <>
      <section className="flex h-screen text-sm">
        {/* left div */}
        <div className="flex items-center justify-center w-1/2 bg-bodyMain">
          <img
            className="w-[60%] min-w-[300px] max-w-[440px]"
            src="./images/coding.png"
            alt="Lil' Coder"
          />
        </div>

        {/* right div */}
        <div className="flex items-center justify-center w-1/2 bg-fuchsia-50">
          {/* the signIN card div */}
          <div className="flex flex-col justify-center items-center p-7 bg-white shadow-lg">
            {/* the upper elements */}
            <div className="flex flex-col justify-center items-center gap-3">
              <h3 className="text-xl text-primary">Join Coders Now!</h3>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                ref={emailRef} // Referenz für Email
                onKeyDown={handleKeyPress} // Pressing Enter triggers Button, too (bzw es triggert die handleKeyPress-func)
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                ref={passwordRef} // Referenz für Passwort
                onKeyDown={handleKeyPress} // Pressing Enter triggers Button, too (bzw es triggert die handleKeyPress-func)
              />

              {/* Fehler anzeigen */}
              <p style={{ color: "red" }}>{error ? error : ""}</p>

              <BigBlueButton onClick={handleSubmit}>Login</BigBlueButton>
            </div>
            {/* the lower part */}
            <p className="text-sm">
              New to CodeCLA?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;

// externe Importe
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// lokale Importe
import InputField from "../_components/InputField";
import BigBlueButton from "../_components/BigBlueButton";

// Creating an object schema - das hier defniert das Zod-Schema
const mySchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

function SignUp() {
  // hier nutze ich useForm von react-hook-form, um ein Formular-Management zu machen
  // useForm gibt ein Objekt zurück mit properties, auf die ich hier mit destructuring zugreife
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mySchema),
  });

  const onSubmit = (data) => {
    // Save submitted data somehow
  };

  // handle pressing Enter while in input field
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)(); // Trigger handleSubmit when Enter is pressed
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
          {/* the signUP card div */}
          <div className="flex flex-col justify-center items-center p-7 bg-white shadow-lg">
            {/* the upper elements */}
            <div className="flex flex-col justify-center items-center gap-3">
              <h3 className="text-xl text-primary">Join Coders Now!</h3>
              <form className="flex flex-col gap-3">
                <InputField
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  {...register("first_name")}
                  onKeyDown={handleKeyPress}
                />
                {/* Fehler anzeigen */}
                {errors.first_name ? (
                  <p style={{ color: "red" }}>{errors.first_name.message}</p>
                ) : null}

                <InputField
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  {...register("last_name")}
                  onKeyDown={handleKeyPress}
                />
                {/* Fehler anzeigen */}
                {errors.last_name ? (
                  <p style={{ color: "red" }}>{errors.last_name.message}</p>
                ) : null}

                <InputField
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email")}
                  onKeyDown={handleKeyPress}
                />
                {/* Fehler anzeigen */}
                {errors.email ? (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                ) : null}

                <InputField
                  type="password"
                  name="password"
                  placeholder="Password"
                  {...register("password")}
                  onKeyDown={handleKeyPress}
                />
                {/* Fehler anzeigen */}
                {errors.password ? (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                ) : null}

                <BigBlueButton onClick={handleSubmit(onSubmit)}>
                  Sign Up
                </BigBlueButton>
              </form>
            </div>
            {/* the lower part */}
            <p className="text-sm">
              Already have an account?
              <Link to="/sign-in" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;

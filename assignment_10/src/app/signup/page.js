"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Creating an object schema - das hier defniert das Zod-Schema
const mySchema = z.object({
  first_name: z.string().min(2, "String must contain at least 2 characters"),
  last_name: z.string().min(2, "String must contain at least 2 characters"),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function SignUp() {
  const router = useRouter(); // initialisiert den Router

  // hier nutze ich useForm von react-hook-form, um ein Formular-Management zu machen
  // useForm gibt ein Objekt zurück mit properties, auf die ich hier mit destructuring zugreife
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mySchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      alert("User created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
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
            <div className="flex flex-col justify-center gap-3">
              <h3 className="mb-3 text-xl font-bold">Join Managers Now!</h3>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  className="w-80 h-11 pl-2 rounded-md text-xs bg-myWhite placeholder-MyLightGray"
                  type="text"
                  placeholder="First Name"
                  {...register("first_name")}
                />
                {/* Fehler anzeigen */}
                {errors.first_name ? (
                  <p style={{ color: "red" }}>{errors.first_name.message}</p>
                ) : null}

                <Input
                  className="w-80 h-11 pl-2 rounded-md text-xs bg-myWhite placeholder-MyLightGray"
                  type="text"
                  placeholder="Last Name"
                  {...register("last_name")}
                />
                {/* Fehler anzeigen */}
                {errors.last_name ? (
                  <p style={{ color: "red" }}>{errors.last_name.message}</p>
                ) : null}

                <Input
                  className="w-80 h-11 pl-2 rounded-md text-xs bg-myWhite placeholder-MyLightGray"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {/* Fehler anzeigen */}
                {errors.email ? (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                ) : null}

                <Input
                  className="w-80 h-11 pl-2 rounded-md text-xs bg-myWhite placeholder-MyLightGray"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {/* Fehler anzeigen */}
                {errors.password ? (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                ) : null}

                <Button
                  className="w-80 h-9 text-myWhite rounded-md bg-blue-500 hover:text-gray-600"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </div>
            {/* the lower part */}
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
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

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function SignIn() {
  const router = useRouter(); // initialisiert den Router
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.email === data.email && user.password === data.password
        );

        if (user) {
          router.push("/challenges");
        } else {
          alert("Invalid Login");
        }
      })
      .catch((error) => {
        console.error("Error when retrieving data", error);
        alert("Server error");
      });
  };

  const passwordProps = register("password");
  /* Wenn ich register("password") aufrufe, gibt react-hook-form etwa folgendes Object zurück
    {
    name: "password",
    ref: someDOMElement, // Referenz zum Input
    onChange: someFunction, // Event-Handler für Änderungen
    onBlur: someFunction, // Event-Handler für Blur-Event
    }
*/

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
            <form
              className="flex flex-col justify-center gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="mb-3 text-xl font-bold">Join Managers Now!</h3>
              <Input
                className="w-80 h-11 pl-2 rounded-md text-xs bg-myWhite placeholder-MyLightGray"
                type="email"
                placeholder="Email"
                // register() verbindet Inputs mit react-hook-form - ähnlich wie useRef
                {...register("email")}
              />
              <p style={{ color: "red" }}>{errors.email?.message}</p>

              {/* statt des Spred-Operators mache ich den password-Input hier explizit*/}
              <Input
                className="w-80 h-11 pl-2 rounded-md text-xs bg-myWhite placeholder-MyLightGray"
                type="password"
                placeholder="Password"
                name={passwordProps.name}
                ref={passwordProps.ref}
                onChange={passwordProps.onChange}
                onBlur={passwordProps.onBlur}
              />
              <p style={{ color: "red" }}>{errors.password?.message}</p>

              <Button
                className="w-80 h-9 text-myWhite rounded-md bg-blue-500 hover:text-gray-600"
                type="submit"
              >
                Login
              </Button>
            </form>
            {/* the lower part */}
            <p className="text-sm">
              New to CodeCLA?{" "}
              <Link href="/signup" className="text-primary hover:underline">
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

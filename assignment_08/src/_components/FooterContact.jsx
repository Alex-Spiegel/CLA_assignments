import React, { useState } from "react";
import Swal from "sweetalert2";

function FooterContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleInputChange = (e) => {
    if (e.target.name === "name") {
      setFormData({
        name: e.target.value,
        email: formData.email,
        message: formData.message,
      });
    } else if (e.target.name === "email") {
      setFormData({
        name: formData.name,
        email: e.target.value,
        message: formData.message,
      });
    } else if (e.target.name === "message") {
      setFormData({
        name: formData.name,
        email: formData.email,
        message: e.target.value,
      });
    }
  };

  const handleFocus = (field) => {
    if (field === "name") {
      setIsFocused({
        name: true,
        email: isFocused.email,
        message: isFocused.message,
      });
      setErrors({
        name: "",
        email: errors.email,
        message: errors.message,
      });
    } else if (field === "email") {
      setIsFocused({
        name: isFocused.name,
        email: true,
        message: isFocused.message,
      });
      setErrors({
        name: errors.name,
        email: "",
        message: errors.message,
      });
    } else if (field === "message") {
      setIsFocused({
        name: isFocused.name,
        email: isFocused.email,
        message: true,
      });
      setErrors({
        name: errors.name,
        email: errors.email,
        message: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }
    if (formData.message.trim() === "") {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Swal.fire({
        title: "Thank you for reaching out!",
        text: "Form submitted successfully!",
        icon: "success",
      });
    }
  };

  return (
    <section>
      <div className="mx-auto px-10 pt-10 pv-0 rounded-tl-[50px] rounded-br-none text-myWhite bg-bodyMain">
        <h2 className="text-xl font-bold">Contact us</h2>
        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
          <label
            className="block mt-3 mb-1 text-xs font-semibold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-[100%] md:w-[50%] h-9 pl-2 rounded text-black"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={() => handleFocus("name")}
            placeholder="Your Name"
          />
          {errors.name && !isFocused.name && (
            <p className="pt-1 text-[10px] font-normal text-red-600">
              {errors.name}
            </p>
          )}

          <label
            className="block mt-3 mb-1 text-xs font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-[100%] md:w-[50%] h-9 pl-2 rounded text-black"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus("email")}
            placeholder="Your Email"
          />
          {errors.email && !isFocused.email && (
            <p className="pt-1 text-[10px] font-normal text-red-600">
              {errors.email}
            </p>
          )}

          <label
            className="block mt-3 mb-1 text-xs font-semibold"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-[100%] md:w-[50%] h-20 mb-1 pt-2 rounded text-black"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => handleFocus("message")}
            placeholder="Your Message"
          ></textarea>
          {errors.message && !isFocused.message && (
            <p className="pt-1 text-[10px] font-normal text-red-600">
              {errors.message}
            </p>
          )}

          <button
            className="border border-primary rounded-md bg-primary py-2 px-4 font-bold text-xs text-myWhite hover:text-primary hover:bg-myWhite"
            type="submit"
          >
            Submit
          </button>
        </form>

        <p className="mx-auto py-2 w-[50%] text-xs text-center text-myWhite font-semibold">
          &#169; {new Date().getFullYear()} Your Competitive Programming
          Platform. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default FooterContact;

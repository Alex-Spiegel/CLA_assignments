import axios from "axios";
import { cookies } from "next/headers"; // Importiere Cookies

export async function POST(req) {
  try {
    const token = cookies().get("authToken")?.value; // Token aus Cookies holen
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const requestBody = await req.json(); // Form-Daten auslesen

    const response = await axios.post(
      "http://localhost:4000/challenges",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("New Challenge API Error:", error);

    return new Response(
      JSON.stringify({ message: "Failed to create challenge" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

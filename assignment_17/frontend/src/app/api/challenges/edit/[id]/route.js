import axios from "axios";
import { cookies } from "next/headers"; // Importiere Cookies

export async function PATCH(req, context) {
  try {
    const token = cookies().get("authToken")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { params } = context;
    const challengeId = params.id; // Holt die ID aus der URL

    if (!challengeId) {
      return new Response(
        JSON.stringify({ message: "Challenge ID is missing" }),
        {
          status: 400,
        }
      );
    }

    const requestBody = await req.json();

    const response = await axios.patch(
      `http://localhost:4000/challenges/${challengeId}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Update Challenge API Error:",
      error?.response?.data || error.message
    );
    return new Response(
      JSON.stringify({
        message: error?.response?.data?.message || "Failed to update challenge",
      }),
      { status: error?.response?.status || 500 }
    );
  }
}

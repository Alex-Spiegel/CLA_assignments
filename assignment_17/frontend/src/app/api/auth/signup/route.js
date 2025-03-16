// Diese Next.js API-Route (!) verarbeitet die Anfrage und leitet sie ans Express-backend weiter
import axios from "axios";

export async function POST(req) {
  try {
    const { first_name, last_name, email, password } = await req.json();

    const response = await axios.post(
      "http://localhost:5000/managers/register",
      { first_name, last_name, email, password }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Signup API Error:", error?.response?.data || error.message);
    return new Response(
      JSON.stringify({ message: error?.response?.data || "Unknown error" }),
      { status: error?.response?.status || 500 }
    );
  }
}

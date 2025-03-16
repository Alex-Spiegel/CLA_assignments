// Diese Next.js API-Route (!) verarbeitet die Anfrage und leitet sie ans Express-backend weiter
import axios from "axios";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const response = await axios.post("http://localhost:5000/managers/login", {
      email,
      password,
    });

    const token = response.data.token; // Token aus dem Express-Backend holen

    if (!token) {
      throw new Error("Token missing in API response");
    }

    // Cookie direkt über den Response-Header setzen
    return new Response(
      JSON.stringify({ message: "Login successful", token }), // Token hier explizit zurückgeben!
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=72000; ${
            process.env.NODE_ENV === "production"
              ? "Secure; SameSite=Strict"
              : ""
          }`,
        },
      }
    );
  } catch (error) {
    console.error("Signin API Error:", error?.response?.data || error.message);
    return new Response(
      JSON.stringify({
        message: error?.response?.data?.message || "Login failed",
      }),
      { status: error?.response?.status || 500 }
    );
  }
}

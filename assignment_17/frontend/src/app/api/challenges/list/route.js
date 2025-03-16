import axios from "axios";

export async function GET(req) {
  try {
    // Token aus dem Request-Header holen
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Anfrage an die NestJS API weiterleiten
    const response = await axios.get("http://localhost:4000/challenges", {
      headers: {
        Authorization: authHeader, // Token mitgeben
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Challenges API Error:",
      error?.response?.data || error.message
    );
    return new Response(
      JSON.stringify({
        message: error?.response?.data?.message || "Failed to fetch challenges",
      }),
      { status: error?.response?.status || 500 }
    );
  }
}

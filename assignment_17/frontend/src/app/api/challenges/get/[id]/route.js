import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers"; // ✅ Next.js Cookies importieren

export async function GET(req, { params }) {
  try {
    console.log("Received params:", params); // Debugging

    if (!params || !params.id) {
      return NextResponse.json(
        { message: "Challenge ID is missing" },
        { status: 400 }
      );
    }

    const challengeId = params.id;
    const token = cookies().get("authToken")?.value; // ✅ Token aus Cookies holen

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const response = await axios.get(
      `http://localhost:4000/challenges/${challengeId}`,
      {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Token an NestJS weitergeben
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Get Challenge API Error:", error.response?.data || error);
    return NextResponse.json(
      {
        message: "Failed to fetch challenge",
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}

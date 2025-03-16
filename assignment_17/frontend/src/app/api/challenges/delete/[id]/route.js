export async function DELETE(req, { params }) {
  try {
    const id = params.id; // ID aus der URL holen

    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(`http://localhost:4000/challenges/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in DELETE API route:", error.message);
    return new Response(
      JSON.stringify({ message: "Failed to delete challenge" }),
      { status: 500 }
    );
  }
}

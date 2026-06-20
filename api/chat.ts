export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  try {
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    console.log("Key being used:", process.env.GEMINI_API_KEY?.slice(0, 10));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      },
    );

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data));
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I could not generate a response.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
}

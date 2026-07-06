import { getAdvisorReply } from "../../lib/advisor";

// Vercel serverless function — mirrors the POST /api/anthropic/advisor route in server.ts,
// which only runs during local dev (tsx server.ts). Both call the shared lib/advisor.ts.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const { message, chatHistory, assessmentDetails } = req.body ?? {};

    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const text = await getAdvisorReply(message, chatHistory, assessmentDetails);
    res.status(200).json({ text });
  } catch (error: any) {
    console.error("Anthropic API Error:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred while communicating with the compliance advisor.",
    });
  }
}

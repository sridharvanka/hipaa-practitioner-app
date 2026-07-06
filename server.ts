import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { getAdvisorReply } from "./lib/advisor";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API endpoint for AI HIPAA Regulatory & Risk Advisor.
// This route only runs in local dev (tsx server.ts). On Vercel, api/anthropic/advisor.ts
// serves the same request — both share the Anthropic logic in lib/advisor.ts.
app.post("/api/anthropic/advisor", async (req, res) => {
  try {
    const { message, chatHistory, assessmentDetails } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const text = await getAdvisorReply(message, chatHistory, assessmentDetails);
    res.json({ text });

  } catch (error: any) {
    console.error("Anthropic API Error:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred while communicating with the compliance advisor."
    });
  }
});

// Serve health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// Setup Vite Dev Server vs Static files
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HIPAA Regulatory Timeline Dev Server running on http://0.0.0.0:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
  process.exit(1);
});

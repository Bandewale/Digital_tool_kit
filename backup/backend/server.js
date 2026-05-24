// =============================================
// AgriReadiness – server.js
// Express Backend with Groq AI Advisory API
// FREE tier – No billing required
// =============================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

// Load environment variables from .env file
dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

// -----------------------------------------------
// MIDDLEWARE
// -----------------------------------------------

// Enable CORS so your frontend (GitHub Pages) can call this backend
app.use(cors({
  origin: "*",  // In production, replace * with your GitHub Pages URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Parse JSON request bodies
app.use(express.json());

// -----------------------------------------------
// INIT GROQ CLIENT
// API key is read from .env – NEVER expose in frontend
// Get your free key at: https://console.groq.com
// -----------------------------------------------
console.log("🔑 GROQ KEY:", process.env.GROQ_API_KEY);
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// -----------------------------------------------
// RETRY HELPER
// Automatically retries on 429 rate-limit errors
// -----------------------------------------------
async function callWithRetry(fn, retries = 3, delayMs = 35000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const is429 =
        err?.status === 429 ||
        err?.message?.includes("429") ||
        err?.message?.includes("RESOURCE_EXHAUSTED") ||
        err?.message?.includes("rate_limit");

      if (is429 && attempt < retries) {
        console.log(`⚠️  Rate limited. Retrying in ${delayMs / 1000}s (attempt ${attempt}/${retries})...`);
        await new Promise(r => setTimeout(r, delayMs));
      } else {
        throw err;
      }
    }
  }
}

// -----------------------------------------------
// HEALTH CHECK ROUTE
// -----------------------------------------------
app.get("/", (req, res) => {
  res.json({ status: "AgriReadiness backend is running ✅ (powered by Groq)" });
});

// -----------------------------------------------
// POST /generate-advisory
// Body: { name, score, category, digital_experience, usability, feedback }
// Returns: { advisory: "string" }
// -----------------------------------------------
app.post("/generate-advisory", async (req, res) => {
  const { name, score, category, digital_experience, usability, feedback } = req.body;

  // Basic input validation
  if (!name || score === undefined || !category) {
    return res.status(400).json({
      error: "Missing required fields: name, score, category"
    });
  }

  // -----------------------------------------------
  // BUILD PROMPT – Agriculture context, farmer-friendly
  // -----------------------------------------------
  const prompt = `
You are an expert agricultural digital readiness advisor helping farmers in India improve their livelihoods through smart farming and digital tools.

A farmer has just completed the AgriReadiness Digital Assessment. Here are their results:

- Farmer Name: ${name}
- Total Score: ${score} out of 20
- Readiness Category: ${category}
- Digital Experience: ${digital_experience}
- Finds Digital Tools: ${usability}
- Their Own Feedback / Comments: "${feedback}"

Score Interpretation:
- Low (0–8): Farmer needs foundational support in both digital literacy and farming practices.
- Medium (9–16): Farmer has some readiness but needs targeted guidance in specific areas.
- High (17–20): Farmer is well-prepared and can be guided toward advanced digital tools and innovation.

Your task:
Write a warm, encouraging, farmer-friendly advisory (4–6 sentences) that:
1. Acknowledges their current readiness level respectfully
2. Gives 2–3 specific, practical suggestions suited to their category and digital experience
3. Recommends Indian government schemes or digital tools where appropriate (e.g., eNAM, PM-KISAN, Kisan Suvidha app, etc.)
4. Ends with an encouraging, motivating message
5. Uses simple, clear language (avoid jargon – the farmer may have limited literacy)

Do not use bullet points. Write in friendly, conversational paragraphs only.
`;

  console.log(`\n📋 Advisory request received for: ${name} | Score: ${score} | Category: ${category}`);

  try {
    // -----------------------------------------------
    // CALL GROQ API with retry logic
    // -----------------------------------------------
    const advisory = await callWithRetry(async () => {
      const response = await groq.chat.completions.create({
        model:       "llama-3.3-70b-versatile", // Free, fast, highly capable model
        messages:    [{ role: "user", content: prompt }],
        max_tokens:  600,
        temperature: 0.7  // Slightly creative but grounded
      });

      return response.choices[0].message.content.trim();
    });

    console.log(`✅ Advisory generated successfully for: ${name}`);

    // Return advisory to frontend
    res.json({ advisory });

  } catch (err) {
    console.error("❌ Groq API Error:", err?.message || err);

    // Handle rate limit errors gracefully
    const is429 =
      err?.status === 429 ||
      err?.message?.includes("rate_limit") ||
      err?.message?.includes("429");

    if (is429) {
      return res.status(429).json({
        error: "AI service is temporarily rate-limited. Please try again in 30 seconds.",
        retryAfter: 30
      });
    }

    // Handle missing/invalid API key
    if (err?.message?.includes("401") || err?.message?.includes("api_key")) {
      return res.status(500).json({
        error: "Invalid or missing GROQ_API_KEY. Please check your .env file."
      });
    }

    // Generic fallback
    res.status(500).json({
      error: "Failed to generate advisory. Please try again.",
      details: err?.message
    });
  }
});

// -----------------------------------------------
// START SERVER
// -----------------------------------------------
app.listen(PORT, () => {
  console.log(`\n🌿 AgriReadiness backend running on http://localhost:${PORT}`);
  console.log(`   Powered by: Groq (llama-3.3-70b-versatile)`);
  console.log(`   POST /generate-advisory  → AI Advisory endpoint\n`);
});
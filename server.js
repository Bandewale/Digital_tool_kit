// =============================================
// AgriReadiness – server.js
// Express Backend with OpenAI Advisory API
// =============================================

const express  = require("express");
const cors     = require("cors");
const dotenv   = require("dotenv");
const Anthropic = require("@anthropic-ai/sdk"); // Using Anthropic Claude SDK

// Load environment variables from .env file
dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

// -----------------------------------------------
// MIDDLEWARE
// -----------------------------------------------

// Enable CORS so your frontend (GitHub Pages) can call this backend
app.use(cors({
  origin: "*",           // ⚠️ In production, replace * with your GitHub Pages URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Parse JSON request bodies
app.use(express.json());

// -----------------------------------------------
// INIT ANTHROPIC CLIENT
// API key is read from .env – NEVER expose in frontend
// -----------------------------------------------
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY  // Set this in your .env file
});

// -----------------------------------------------
// HEALTH CHECK ROUTE
// -----------------------------------------------
app.get("/", (req, res) => {
  res.json({ status: "AgriReadiness backend is running ✅" });
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
    return res.status(400).json({ error: "Missing required fields: name, score, category" });
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

Do not use bullet points. Write in friendly, conversational paragraphs.
`;

  try {
    // -----------------------------------------------
    // CALL ANTHROPIC CLAUDE API
    // -----------------------------------------------
    const message = await anthropic.messages.create({
      model:      "claude-opus-4-5",   // Use latest Claude model
      max_tokens: 600,
      messages: [
        {
          role:    "user",
          content: prompt
        }
      ]
    });

    // Extract the text response
    const advisory = message.content[0].text.trim();

    // Return advisory to frontend
    res.json({ advisory });

  } catch (err) {
    console.error("Anthropic API Error:", err);
    res.status(500).json({
      error: "Failed to generate advisory. Please check your API key and try again.",
      details: err.message
    });
  }
});

// -----------------------------------------------
// START SERVER
// -----------------------------------------------
app.listen(PORT, () => {
  console.log(`\n🌿 AgriReadiness backend running on http://localhost:${PORT}`);
  console.log(`   POST /generate-advisory  → AI Advisory endpoint`);
});

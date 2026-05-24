// =============================================
// AgriReadiness – server.js
// ENHANCED for PhD Seminar: Digital Toolkit for Agricultural Extension
//
// Changes:
// - Accepts 'language', 'constraints', and per-dimension scores in request body
// - Updated structured Groq prompt (Part 12):
//     · Extension-oriented, non-chatbot tone
//     · Multilingual output (English / Hindi / Marathi)
//     · Avoids hallucinations, fake statistics, motivational filler
//     · Generates structured advisory paragraphs
// =============================================

const express = require("express");
const cors    = require("cors");
const dotenv  = require("dotenv");
const Groq    = require("groq-sdk");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

// -----------------------------------------------
// MIDDLEWARE
// -----------------------------------------------
app.use(cors({
  origin: "*",   // Replace * with your GitHub Pages URL in production
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// -----------------------------------------------
// GROQ CLIENT
// -----------------------------------------------
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// -----------------------------------------------
// RETRY HELPER (preserved)
// -----------------------------------------------
async function callWithRetry(fn, retries = 3, delayMs = 35000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const is429 =
        err?.status === 429 ||
        err?.message?.includes("429") ||
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
// HEALTH CHECK
// -----------------------------------------------
app.get("/", (req, res) => {
  res.json({ status: "AgriReadiness backend running ✅ — Digital Toolkit for Agricultural Extension" });
});

// -----------------------------------------------
// POST /generate-advisory
//
// Request body (enhanced):
// {
//   name, score, category,
//   digital_experience, usability, feedback, constraints,
//   resources, guidance, planning, consistency,
//   language   ← NEW: "English" | "Hindi" | "Marathi"
// }
//
// Response: { advisory: "string" }
// -----------------------------------------------
app.post("/generate-advisory", async (req, res) => {
  const {
    name, score, category,
    digital_experience, usability, feedback, constraints,
    resources, guidance, planning, consistency,
    language = "English"
  } = req.body;

  // Validation
  if (!name || score === undefined || !category) {
    return res.status(400).json({ error: "Missing required fields: name, score, category" });
  }

  // -----------------------------------------------
  // LANGUAGE INSTRUCTION
  // -----------------------------------------------
 const languageInstructions = {
  English: "Generate the advisory entirely in English.",

  Hindi:
    "Generate the advisory entirely in Hindi (हिंदी). Use natural, conversational Hindi appropriate for rural farmers in India. Do not use overly formal or bureaucratic Hindi. Do not mix English sentences.",

  Telugu:
    "Generate the advisory entirely in Telugu (తెలుగు). Use natural, conversational Telugu appropriate for rural farmers in Andhra Pradesh and Telangana. Do not use overly formal Telugu. Do not mix English sentences."
};
  const langInstruction = languageInstructions[language] || languageInstructions["English"];

  // -----------------------------------------------
  // UPDATED GROQ PROMPT (Part 12)
  // Extension-oriented · Structured · Non-chatbot
  // -----------------------------------------------
  const prompt = `
You are an agricultural extension advisory system generating a formal digital readiness advisory report. Your output is used in a research prototype demonstrating adaptive advisory systems for agricultural extension.

ASSESSMENT DATA:
- Respondent: ${name}
- Composite Readiness Score: ${score}/20
- Readiness Category: ${category} (Low: 0–8, Medium: 9–16, High: 17–20)
- Prior Digital Engagement: ${digital_experience}
- Digital Infrastructure Access: ${resources}/5
- Extension Support Availability: ${guidance}/5
- Farm Management Planning Capacity: ${planning}/5
- Technology Adoption Consistency: ${consistency}/5
- Primary Adoption Barrier: ${constraints}
- Perceived Tool Usability: ${usability}
- Open-Ended Response: "${feedback}"

LANGUAGE INSTRUCTION:
${langInstruction}

ADVISORY GENERATION RULES — STRICTLY FOLLOW ALL:

1. Write 3–4 focused paragraphs of advisory content.
2. Each paragraph addresses a distinct aspect: (a) readiness interpretation, (b) specific context-adapted recommendations, (c) relevant government schemes or digital tools, (d) extension system engagement.
3. Tone must be: professional, analytical, concise, and extension-system oriented.
4. Do NOT use bullet points, numbered lists, or headers inside the advisory.
5. Do NOT use any of these phrases or similar: "great job", "well done", "I'm glad", "exciting journey", "you should be proud", "keep it up", "as an AI", "I think", "I feel", "I recommend you", "don't worry".
6. Do NOT start with the respondent's name or a greeting.
7. Do NOT invent statistics, percentages, or research citations.
8. Do NOT make exaggerated claims about outcomes.
9. Recommendations must be specific to the score, category, and identified barrier — not generic.
10. Where relevant, mention real Indian government agricultural programmes: eNAM, PM-KISAN, Kisan Suvidha app, IFFCO Kisan, Kisan Call Centre (1800-180-1551), Krishi Vigyan Kendras (KVK), Digital India agricultural initiatives.
11. Recommendations should prioritise low-cost, accessible, and digitally-inclusive approaches appropriate to the identified readiness level.
12. The advisory should read as a toolkit-generated assessment report, not as a conversation or chatbot response.

BEGIN ADVISORY:
`;

  console.log(`\n📋 Advisory request | Name: ${name} | Score: ${score} | Category: ${category} | Language: ${language}`);

  try {
    const advisory = await callWithRetry(async () => {
      const response = await groq.chat.completions.create({
        model:       "llama-3.3-70b-versatile",
        messages:    [{ role: "user", content: prompt }],
        max_tokens:  700,
        temperature: 0.4   // Lower temperature = more consistent, less hallucination
      });
      return response.choices[0].message.content.trim();
    });

    console.log(`✅ Advisory generated | ${name} | ${language}`);
    res.json({ advisory });

  } catch (err) {
    console.error("❌ Groq API Error:", err?.message || err);

    const is429 = err?.status === 429 || err?.message?.includes("rate_limit");
    if (is429) {
      return res.status(429).json({
        error: "Advisory service is temporarily rate-limited. Please retry after 30 seconds.",
        retryAfter: 30
      });
    }

    if (err?.message?.includes("401") || err?.message?.includes("api_key")) {
      return res.status(500).json({ error: "Invalid or missing GROQ_API_KEY. Check your .env file." });
    }

    res.status(500).json({ error: "Advisory generation failed.", details: err?.message });
  }
});

// -----------------------------------------------
// START SERVER
// -----------------------------------------------
app.listen(PORT, () => {
  console.log(`\n🌿 AgriReadiness backend running on http://localhost:${PORT}`);
  console.log(`   Toolkit: Digital Toolkit for Agricultural Extension`);
  console.log(`   Model: Groq llama-3.3-70b-versatile`);
  console.log(`   POST /generate-advisory → Multilingual adaptive advisory\n`);
});
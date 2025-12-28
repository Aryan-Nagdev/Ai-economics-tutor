import express from "express";
import cors from "cors";
import fs from "fs";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// =====================================
// Optional: Load knowledge base
// =====================================
let knowledgeBase = "";
try {
  knowledgeBase = fs.readFileSync("knowledge_base.txt", "utf-8");
  console.log("✅ knowledge_base.txt loaded");
} catch {
  console.log("⚠️ knowledge_base.txt not found (optional)");
}

// =====================================
// Health check
// =====================================
app.get("/", (req, res) => {
  res.send("🚀 AI Economics Tutor Backend (OLLAMA + phi3)");
});

// =====================================
// MAIN ASK ROUTE (SHORT & FAST)
// =====================================
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question || !question.trim()) {
    return res.json({
      answer: "Please ask a valid economics question 😊",
    });
  }

  const prompt = `
You are an A-Level Economics teacher.

Answer VERY briefly:
- 5–7 bullet points only
- Simple language
- One real-world example
- One exam tip at the end
- NO diagrams
- NO long paragraphs

Question:
${question}
`;

  try {
    console.log("📤 Sending request to Ollama (phi3)...");

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi3",
        prompt,
        stream: false,
        options: {
          num_predict: 180,   // limits length (FAST)
          temperature: 0.4   // focused answers
        }
      },
      { timeout: 60000 }     // 1 minute max
    );

    const answer = response?.data?.response;

    if (!answer) {
      return res.json({
        answer: "⚠️ No response generated. Try again.",
      });
    }

    res.json({
      answer: answer.trim(),
    });

  } catch (err) {
    console.error("❌ OLLAMA ERROR:", err.message);
    res.status(500).json({
      answer: "⚠️ Local AI is busy. Please wait and try again.",
    });
  }
});

// =====================================
// QUICK REVISION SUMMARY
// =====================================
app.get("/summary", async (req, res) => {
  const prompt = `
Give a VERY SHORT revision summary on OLIGOPOLY.
- Definition
- Key features
- Kinked demand curve
- Collusion
- Exam tip
`;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi3",
        prompt,
        stream: false,
        options: { num_predict: 200 }
      },
      { timeout: 60000 }
    );

    res.json({ summary: response.data.response.trim() });
  } catch {
    res.json({ summary: "Summary unavailable right now." });
  }
});

// =====================================
// EXAM TIPS ENDPOINT
// =====================================
app.get("/exam-tips", (req, res) => {
  res.json({
    tips: [
      "Start with a clear definition",
      "Mention interdependence",
      "Use one real-world example",
      "Explain kinked demand curve briefly",
      "Link answer to consumer welfare",
    ],
  });
});

// =====================================
// START SERVER
// =====================================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log("🤖 AI Engine: OLLAMA (phi3)");
});

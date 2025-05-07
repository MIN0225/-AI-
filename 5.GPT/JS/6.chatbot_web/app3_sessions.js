const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
require("dotenv").config({ path: "../../.env" });
const axios = require("axios");
const {
  getRecentConversation,
  newSession,
  getAllSessions,
  getCurrentSession,
  getConversationBySession,
  saveMessage,
  getSessionById,
} = require('./database3')

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index3.html"));
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// 새로운 세션 생성
app.post("/api/new-session", (req, res) => {
  const result = newSession();
  res.json({ success: true, sessionId: result.lastInsertRowid });
});

// 전체 세션 목록 조회
app.get("/api/all-sessions", (req, res) => {
  // 이해를 돕기위해 api 이름을 길게 한 거지. 좋은 네이밍은 아님.
  const sessions = getAllSessions();
  res.json({ allSessions: sessions });
});

// 최근 세션의 대화 내용 다 가져오기
app.get("/api/current-session", (req, res) => {
  const session = getCurrentSession();
  const conversationHistory = getConversationBySession(session.id);
  res.json({
    id: session.id,
    start_time: session.start_time,
    conversationHistory,
  });
});

// 특정 세션 대화 내용 가져오기
app.get("/api/session/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;
  const session = getSessionById(sessionId);
  const history = getConversationBySession(sessionId);

  res.json({ id: session.id, start_time: session.start_time, conversationHistory: history });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { sessionId, userInput } = req.body;
    console.log(`세션ID: ${sessionId}, 사용자글: ${userInput}`);

    if (!userInput) {
      return res.status(400).json({ error: "userInput is required" });
    }

    const previousConversation = getRecentConversation(sessionId);
    console.log('getRecentConversation()완료: ', previousConversation);
    saveMessage('user', userInput, sessionId);

    const chatGPTResponse = await getChatGPTResponse(previousConversation);
    console.log("ChatGPT response:", chatGPTResponse);
    console.log("-----");
    console.log('보낼전체대화내용:', previousConversation);
    console.log("-----");
    // conversationHistory.push({role: 'assistant', content: chatGPTResponse})
    saveMessage('assistant', chatGPTResponse, sessionId);

    res.json({ message: chatGPTResponse });
  } catch (error) {
    console.error("Error in /api/chat endpoint:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

const CHATGPT_URL = "https://api.openai.com/v1/chat/completions";

async function getChatGPTResponse(previousConversation) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    const response = await axios.post(
      CHATGPT_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          // Fixed 'message' to 'messages'
          {
            role: "system",
            content:
              // "You are a helpful assistant. Please remember our conversion history in memory and respond accordingly.",
              '너는 스포츠 트레이너로 운동에 대해서 상세한 답변을 해줄수 있어. 운동과 관련된 질문이 아닐경우, 해당 질문은 적절하지 않다고 답변해줘. 모든 답변은 최대한 간결하게 200글자 아래로 답변해줘.'
          },
          // { role: 'user', content: userInput },
          ...previousConversation
        ],
        temperature: 0.2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract the assistant's response from the OpenAI API response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error calling OpenAI API:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get response from ChatGPT");
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const conversationHistory = [];
const sqlite3 = require('sqlite3');

let db;

async function initializeDatabase() {
  try {
    db = await open({
      filename: path.join(__dirname, 'chat_history.db'),
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('데이터베이스 초기화 성공');
  } catch (error) {
    console.error('DB 초기화 에러');
    process.exit(1);
  }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

function generateSessionId() {
  return 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function getConversationHistory(sessionId) {
  try {
    const conversations = await db.all(
      'SELECT role, content FROM conversations WHERE session_id = ? ORDER BY id ASC',
      [sessionId]
    );
    return conversations;
  } catch (error) {
    console.error('Error 발생');
    return [];
  }
}

async function saveMessage(sessionId, role, content) {
  try {
    await db.run(
      'INSERT INTO conversations (session_id, role, content) VALUES (?, ?, ?)',
      [sessionId, role, content]
    );
  } catch (error) {
    throw error;
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/chat', async (req, res) => {
  try {
    const { userInput, sessionId: clientSessionId } = req.body;
    
    if (!userInput) {
      return res.status(400).json({ error: 'userInput is required' });
    }

    const sessionId = clientSessionId || generateSessionId();
    await saveMessage(sessionId, 'user', userInput);
    const conversationHistory = await getConversationHistory(sessionId);
    
    
    conversationHistory.push({ role: 'user', content: userInput });
    const chatGPTResponse = await getChatGPTResponse(userInput);
    console.log('ChatGPT response:', chatGPTResponse);
    console.log('-----');
    console.log('보낼전체대화내용:', conversationHistory);
    console.log('-----');
    conversationHistory.push({role: 'assistant', content: chatGPTResponse})
    res.json({ message: chatGPTResponse });
  } catch (error) {
    console.error('Error in /api/chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

const CHATGPT_URL = 'https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse(userInput) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }
    
    const response = await axios.post(
      CHATGPT_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [ // Fixed 'message' to 'messages'
          { role: 'system', content: 'You are a helpful assistant. Please remember our conversion history in memory and respond accordingly.' },
          // { role: 'user', content: userInput },
          ...conversationHistory
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    
    // Extract the assistant's response from the OpenAI API response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to get response from ChatGPT');
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
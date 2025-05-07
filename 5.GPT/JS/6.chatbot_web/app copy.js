const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const conversationHistory = [];
const Database = require("better-sqlite3");

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

const db = new Database(':memory'); // 파일에 저장하지 않고, 메모리에 임시 저장하는 DB
// const db = new Database('history.db'); // 파일에 저장하기

db.exec(`
  CREATE TABLE IF NOT EXISTS conversation(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role Text,
    content TEXT)`
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

function getRecentConversation() {
  const stmt = db.prepare('SELECT * FROM conversation ORDER BY id DESC LIMIT 10'); // 최근 10개의 대화
  const rows = stmt.all();
  return rows.reverse(); // 최근 10개 가져와서, 오래된 질문을 먼저 넣기 위해서 순서 바꿈..
}

app.post('/api/chat', async (req, res) => {
  try {
    const { userInput } = req.body;
    
    if (!userInput) {
      return res.status(400).json({ error: 'userInput is required' });
    }
    
    // conversationHistory.push({ role: 'user', content: userInput });
    db.prepare('INSERT INTO conversation (role, content) VALUES (?, ?)').run('user', userInput);
    
    const previousConversation = getRecentConversation();

    const chatGPTResponse = await getChatGPTResponse(previousConversation);
    console.log('ChatGPT response:', chatGPTResponse);
    console.log('-----');
    console.log('보낼전체대화내용:', conversationHistory);
    console.log('-----');
    // conversationHistory.push({role: 'assistant', content: chatGPTResponse})
    db.prepare('INSERT INTO conversation (role, content) VALUES (?, ?)').run('assistant', chatGPTResponse);

    res.json({ message: chatGPTResponse });
  } catch (error) {
    console.error('Error in /api/chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

const CHATGPT_URL = 'https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse(previousConversation) {
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
        ],
        temperature: 0.2
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
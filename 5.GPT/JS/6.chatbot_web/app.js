const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const conversationHistory = [];

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/chat', async (req, res) => {
  try {
    const { userInput } = req.body;

    
    if (!userInput) {
      return res.status(400).json({ error: 'userInput is required' });
    }
    
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
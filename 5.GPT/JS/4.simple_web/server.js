const express = require('express');
const morgan = require('morgan');
const { default: OpenAI } = require('openai/index.mjs');

const app = express();
const port = 3000;

require('dotenv').config({ path: '../../.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
})

app.post('/api/request', async (req, res) => {
  const userInput = req.body.input;
  try {
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a highly skilled software engineer.' },
        {role: 'user', content: userInput}
      ],
      temperature: 0.7  // 일반적으로 0.7을 많이 함
    })
    
    res.send(response.choices[0].message.content);
  } catch (error) {
    if (error.status) {
      const status = error.status;
      if (status === 429) { // 돈이 없다. 크레딧이 떨어지면 반환되는 상태 코드
        console.error('Error: 요청 한도 초과 (크레딧 부족)');
      } else if (status === 401) {
        console.error('Error: 해당 키에 권한이 없습니다');
      } else if (status === 403) {
        console.error('Error: 해당 모델을 이용할 권한이 없습니다.');
      } else {
        console.error(`Error: 알 수 없는 오류입니다. ${status} - ${error.body}`);
      }
    }
  }
})

app.get('/api/sendQuestionStream', async (req, res) => {
  const { question } = req.query;
  console.log('Receive question:', question);

  res.setHeader('Content-Type', 'text/event-stream');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a highly skilled software engineer.' },
        { role: 'user', content: question }
      ],
      stream: true
    });

    for await (const chunk of response) {
      const content = chunk.choices[0].delta.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({content})}\n\n`) // <- 프로토콜의 스펙상, 나의 스트리밍이 끝났을 때
      }
    }
    res.write('data: [DONE]\n\n'); // <- 이런 내용은 다 프로토콜 스펙에 정의 되어 있음
    res.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process your request' });
  }
})

app.listen(port, () => {
  console.log("서버 레디");
})
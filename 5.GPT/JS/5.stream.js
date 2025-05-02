const { OpenAI } = require('openai');
require('dotenv').config({path: '../.env'}) // .env 파일 읽어서 메모리에 올리기

const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY
});

async function getGPTResponse(userInput) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a highly skilled software engineer.' },
      { role: 'user', content: userInput }
    ],
    temperature: 0.7,  // 일반적으로 0.7을 많이 함
    stream: true       // 스트리밍 방식 설정
  });

  for await (const chunk of response) {
    const content = chunk.choices[0].delta.content || '';
    console.log(content);
  }
}

async function chatWithUser() {
  const userInput = '안녕 챗봇, 백엔드 개발자 로드맵 그려줘.';
  const chatGPTResponse = await getGPTResponse(userInput);
  console.log('챗봇 응답: ', chatGPTResponse);
}

chatWithUser();
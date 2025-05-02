require('dotenv').config({path: '../.env'}) // .env 파일 읽어서 메모리에 올리기
const axios = require('axios');

const openaiApiKey = process.env.OPENAI_API_KEY;

// const url = 'https://api.openai.com/v1/responses';
const url = 'https://api.openai.com/v1/chat/completions';

async function getGPTResponse() {
  const response = await axios.post(url, {
    // 본문
    "model": "gpt-3.5-turbo",
    "messages": [
      // {'role': 'system', 'content': 'you are a helpful assistant.'},
      {'role': 'system', 'content': 'you are a cook.'},
      // {'role': 'system', 'content': 'you are a software engineer.'},
      // {'role': 'system', 'content': 'you are a singer.'},
      {'role': 'user', 'content': '나 배고파 대한민국에서 봄 제철 음식 추천해줘.'}
    ],
    temperature: 1.0,  // 정확도 (창의성)
    top_p: 0.9,  // 확률 기반 토큰 선택 범위
    frequency_penalty: 0.5, // 반복 억제
    presence_penalty: 0.6, // 얼마나 새로운 주제를 가져올거냐... 등등
    max_tokens: 100  // 답변의 길이 결정
  },
  { // 헤더
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiApiKey}`
    }
    })
  
  // console.log(response.data);
  return response.data.choices[0].message;
}

async function myfunction() {
  const ai_response = await getGPTResponse();
  console.log(ai_response);
}

myfunction();
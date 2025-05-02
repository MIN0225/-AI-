const { OpenAI } = require('openai');
require('dotenv').config({path: '../.env'}) // .env 파일 읽어서 메모리에 올리기

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('API키가 올바르게 설정되어 있지 않습니다.');
  process.exit(1); // 프로그램 종료
}

const openai = new OpenAI({
  apikey: apiKey
});

async function getGPTResponse(userInput) {
  try {
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a highly skilled software engineer.' },
        {role: 'user', content: userInput}
      ],
      temperature: 0.7  // 일반적으로 0.7을 많이 함
    })
    
    return response.choices[0].message.content;
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
}

async function chatWithUser() {
  const userInput = '안녕 챗봇, 백엔드 개발 로드맵';
  const chatGPTResponse = await getGPTResponse(userInput);
  console.log('챗봇 응답: ', chatGPTResponse);
}

chatWithUser();
// 미션1. 저 영역을 클릭해서 창이 나오게 한다.
// 미션2. X박스를 눌러서 다시 창이 닫히게 한다.
// 미션3. Send 버튼을 통해서... 백엔드로 사용자가 입력한 대화 내용을 전송한다.
// 미션4. 받아온 응답(에코 메세지)을 대화창에 출력한다.
const chatbotIcon = document.getElementById('chatbotIcon');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const sendMessage = document.getElementById('sendMessage');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessage = document.getElementById('chatbotMessage');

const API_SERVER = 'http://127.0.0.1:5001'

chatbotIcon.addEventListener('click', () => {
  console.log('아이콘 누름');
  chatbotIcon.style.display = 'none';
  chatbotWindow.style.display = 'flex';
})

closeChatbot.addEventListener('click', () => {
  chatbotIcon.style.display = 'flex';
  chatbotWindow.style.display = 'none';
})

function addMessage(message, sender = 'user') {
  // 화면에 내 메세지 추가
  const myMessage = document.createElement('div');
  // myMessage.className = 'user-message';
  myMessage.innerHTML = sender + ": " + message;
  chatbotMessage.appendChild(myMessage);

  chatbotMessage.scrollTop = chatbotMessage.scrollHeight;
}

async function getInputFromYourSendMessage() {
  const question = chatbotInput.value;

  chatbotInput.value = ''; // 메세지 지우기
  addMessage(question, 'user');

  const resp = await fetch(`${API_SERVER}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  const result = await resp.json();

  addMessage(result.question, 'chatbot');
}

sendMessage.addEventListener('click', async () => {
  getInputFromYourSendMessage();
});

chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getInputFromYourSendMessage();
  }
})
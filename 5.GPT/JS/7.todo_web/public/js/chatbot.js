
const API_SERVER = 'http://127.0.0.0:3000'

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

function createChatbotUI() {
  const chatbotHTML = `
    <div class="chatbot-icon" id="chatbotIcon">
      <!-- 아이콘 -->
      <i class="bi bi-chat-dots"></i>
    </div>
    <div class="chatbot-window" id="chatbotWindow">
      <!-- 창 -->
      <div class="chatbot-header">
        <span>Chatbot</span>
        <button id="closeChatbot">X</button>
      </div>
      <div class="chatbot-body">
        <div class="chatbot-message" id="chatbotMessage"></div>
        <div class="chatbot-input-container">
          <input type="text" id="chatbotInput" placeholder="메세지를 입력하시오.">
          <button id="sendMessage">Send</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentElement('beforeend', chatbotHTML);
}

document.addEventListener('DOMContentLoaded', () => {
  createChatbotUI();

  const chatbotIcon = document.getElementById('chatbotIcon');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const closeChatbot = document.getElementById('closeChatbot');
  const sendMessage = document.getElementById('sendMessage');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessage = document.getElementById('chatbotMessage');

  chatbotIcon.addEventListener('click', () => {
    chatbotIcon.style.display = 'none';
    chatbotWindow.style.display = 'flex';
  });

  closeChatbot.addEventListener('click', () => {
    chatbotIcon.style.display = 'flex';
    chatbotWindow.style.display = 'none';
  })

})

sendMessage.addEventListener('click', async () => {
  getInputFromYourSendMessage();
});

chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getInputFromYourSendMessage();
  }
})
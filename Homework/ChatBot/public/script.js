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

chatbotIcon.addEventListener('click', () => {
  console.log('아이콘 누름');
  chatbotIcon.style.display = 'none';
  chatbotWindow.style.display = 'flex';
})

closeChatbot.addEventListener('click', () => {
  chatbotIcon.style.display = 'flex';
  chatbotWindow.style.display = 'none';
})

sendMessage.addEventListener('click', async () => {
  // console.log('sendMessage누름');
  const question = chatbotInput.value;

  chatbotInput.value = ''; // 메세지 지우기

  const myMessage = document.createElement('div');
  myMessage.className = 'user-message';
  myMessage.innerHTML = "나: " + question;
  chatbotMessage.appendChild(myMessage);

  // 서버로 보낸다
  const res = await fetch('api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question })
  });
  const result = await res.json();
  console.log(result);

  const answer = document.createElement('div');
  answer.className = 'bot-message';
  answer.innerHTML = result.question;
  chatbotMessage.appendChild(answer);

  chatbotMessage.scrollTop = chatbotMessage.scrollHeight;
})
const button = document.getElementById('sendButton');
const sendButtonStream = document.getElementById('sendButtonStream');

button.addEventListener('click', async () => {
  try {
    const input = document.getElementById('questionInput').value;
    const response = await fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });

    const data = await response.text();  // 일단 text()로 받자
    console.log(`data: ${data}`);

    const p = document.createElement('p');
    p.innerText = data;
    document.getElementById('chatContainer').appendChild(p);
  } catch (error) {
    console.error('요청 중 에러 발생:', error);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  sendButtonStream.addEventListener('click', function () {
    if (question.trim() === "") {
      alert("질문을 입력하세요");
      return;
    }
    // Send the questino to the backend
    // SSE 방식으로 요청
    const eventSource = new EventSource(`/api/sendQuestionStream?question=${encodeURIComponent(question)}`);

    // 응답이 오면??
    eventSource.onmessage = (event) => {
      if (event.data == '[DONE]') { // 모든 스트림 종료시
        console.log('끝');
        eventSource.close();
      }

      const response = JSON.parse(event.data.replace('data: ', '').trim()); // 서버가 보내온 메세지에서 
      if (response.content) {
        displayResponse(response.content);
      }
    }
  });

  function displayResponse(response) {
    const chatContainer = document.getElementById('chatContainer');
    const responseElement = document.createElement('p');
    responseElement.textContent = response;
    chatContainer.appendChild(responseElement);
  }

  function displayResponseStream(response) {
    const chatContainer = document.getElementById('chatContainer');
    responseElement.textContent += response;
    chatContainer.scrollTop = chatContainer.scrollHeight; // 화면 자동으로 내리기
  }
});
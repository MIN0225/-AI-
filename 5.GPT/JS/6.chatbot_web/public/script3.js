document.addEventListener("DOMContentLoaded", async () => {
  // 기본 채팅 윈도우용 DOM
  const formElement = document.getElementById("user-input-form");
  const inputElement = document.getElementById("user-input");
  const chatContainer = document.getElementById("chat-container");
  // 세션 관리용 DOM
  const sessionListContainer = document.getElementById(
    "session-list-container"
  );
  const currentSessionId = document.getElementById("current-session-id");

  // Handle form submission
  formElement.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    submitUserInput();
  });

  async function submitUserInput() {
    const userInput = inputElement.value.trim();
    if (!userInput) return; // Don't send empty messages
    const sessionId = currentSessionId.textContent;
    console.log('userInput: ', userInput);
    // Add user message to the chat
    appendMessage("user", userInput);
    showLoadingIndicator();

    try {
      // Send request to API
      const chatResponse = await requestChatAPI(sessionId, userInput);
      console.log("API response:", chatResponse);

      hideLoadingIndicator();

      // Add bot message to the chat
      if (chatResponse.message) {
        appendMessage("chatbot", chatResponse.message);
      } else {
        appendMessage("chatbot", "No response from chatbot.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      hideLoadingIndicator();
      appendMessage("error", "메시지 전송 중 오류가 발생했습니다.");
    }
    // Clear input field
    inputElement.value = "";
  }

  // Function to add messages to the chat container
  function appendMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${sender}`;
    messageElement.textContent = `${sender}: ${text}`;
    chatContainer.appendChild(messageElement);

    // Auto-scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  let loadingMessageDiv = null;

  function showLoadingIndicator() {
    loadingMessageDiv = document.createElement("div");
    loadingMessageDiv.className = "chat-message chatbot";
    loadingMessageDiv.innerHTML = `
      <div class="message-content">
        <span class="loading-dots"></span> 생각 중...
      </div>
    `;
    chatContainer.appendChild(loadingMessageDiv);
    scrollToBottom();
  }

  function hideLoadingIndicator() {
    if (loadingMessageDiv) {
      loadingMessageDiv.remove();
      loadingMessageDiv = null;
    }
  }

  function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function appendSession(session) {
    const sessionDiv = document.createElement("div");
    sessionDiv.className = "session-item";
    sessionDiv.innerHTML = `
      <a href="#" class="session-link" data-session-id="${session.id}">
        <div class="session-id">${session.id}</div>
        <div class="session-start-time">${session.start_time}</div>
      </a>
    `;
    sessionListContainer.appendChild(sessionDiv);
  }

  // 세션을 
  function addSessionClickListeners() {
    const sessionLinks = document.querySelectorAll('.session-link');
    sessionLinks.forEach(link => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
        const sessionId = link.dataset.sessionId;
        if (sessionId === currentSessionId.textContent) return; // 현재 이미 해당 세션이면 불러오지 않음.
        await showSession(sessionId);
      })
    })
  }

  async function showSession(sessionId) {
    const response = await fetch(`/api/session/${sessionId}`);
    const data = await response.json();
    chatContainer.innerHTML = '';
    console.log(data);

    displaySessionInfo(data);
    currentSessionId.textContent = data.id;
  }

  async function loadAllSessions() {
    const response = await fetch("/api/all-sessions");
    const data = await response.json();
    console.log(data);
    sessionListContainer.innerHTML = "";
    data.allSessions.forEach(appendSession);
    addSessionClickListeners();
  }

  const newChatButton = document.getElementById("new-chat-button");
  newChatButton.addEventListener("click", async function () {
    const response = await fetch("/api/new-session", { method: "POST" });
    const data = await response.json();
    if (data.success) {
      // 화면에 다시 갱신하기
      loadAllSessions();
    }
  });

  function displaySessionInfo(sessionData) {
    currentSessionId.textContent = sessionData.id;
  }

  async function loadChatHistoryAndSession() {
    const response = await fetch("/api/current-session");
    const data = await response.json();
    console.log(data);
    // data.conversationHistory.forEach(appendMessage);

    displaySessionInfo(data);
  }

  // 시작할 때 세션 목록 호출
  await loadAllSessions();
  // 시작할 때 현재 세션 대화 내용 호출
  await loadChatHistoryAndSession();
});

// Function to make a request to /api/chat
async function requestChatAPI(sessionId, userInput) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, userInput }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

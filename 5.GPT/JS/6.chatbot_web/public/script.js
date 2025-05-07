// Function to make a request to /api/chat
async function requestChatAPI(userInput) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
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

document.addEventListener("DOMContentLoaded", () => {
  // Get the correct form and input elements using IDs from HTML
  const formElement = document.getElementById("user-input-form");
  const inputElement = document.getElementById("user-input");
  const chatContainer = document.getElementById("chat-container");

  // Handle form submission
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    const userInput = inputElement.value.trim();
    if (!userInput) return; // Don't send empty messages

    // Add user message to the chat
    appendMessage("user", userInput);
    showLoadingIndicator();

    // Clear input field
    inputElement.value = "";

    try {
      // Send request to API
      const chatResponse = await requestChatAPI(userInput);
      console.log("API response:", chatResponse);

      hideLoadingIndicator();

      // Add bot message to the chat
      if (chatResponse && chatResponse.message) {
        appendMessage("chatbot", chatResponse.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      hideLoadingIndicator();
      appendMessage("error", "메시지 전송 중 오류가 발생했습니다.");
    }
  });

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
});

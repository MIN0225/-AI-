document.addEventListener('DOMContentLoaded', () => {
  
  checkLoginStatus();
  document.getElementById('login').addEventListener('click', (e) => {
    e.preventDefault();
    login();
  })
});

async function checkLoginStatus() {
  const response = await fetch('/api/check-login');
  if (response.status === 200) {
    const data = await response.json();
    // console.log(data);
    showProfile(data.username);
  } else {
    showLoginForm();
  }
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (response.status === 200) {
    
    const data = await response.json();
    // console.log(data); 
    showProfile(data.username);
  } else {
    // 로그인 실패

  }
}

function showProfile(username) {
  document.getElementById('userNameSpan').textContent = username;
  document.getElementById('profile').style.display = 'block';
  document.getElementById('loginFromContainer').style.display = 'none';
}

function showLoginForm() {
  document.getElementById('profile').style.display = 'none';
  document.getElementById('loginFormContainer').style.display = 'block';
}
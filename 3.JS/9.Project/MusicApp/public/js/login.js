document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      })
    })
    // const data = await response.json();

    if (response.ok) {
      console.log("로그인 성공");
      window.location.href = '/home.html';
    } else {
      console.log("로그인 실패");
    }
  })
})
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;
    const email = form.email.value;

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
    // const data = await response.json();
    // console.log('응답 메시지:', data.message);

    if (response.ok) {
      console.log("회원가입 성공");
      window.location.href = '/home.html';
    } else {
      console.log("회원가입 실패");
    }
  })
})
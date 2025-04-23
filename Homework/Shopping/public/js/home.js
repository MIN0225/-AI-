document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login').addEventListener('click', async (e) => {
    e.preventDefault();

    // 세션에 저장된 username 확인
    // username님 안녕하세요 p 태그 추가
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      if (res.status === 200) {
        const sessionRes = await fetch('/api/session-users', {
          method: 'GET',
          credentials: 'include'
        });

        const userData = await sessionRes.json();
        const welcomeContainer = document.getElementById('welcome-container');
        welcomeContainer.innerHTML = `<p>${userData.username}님 안녕하세요!</p>`;
      } else {
        console.log("로그인 실패");
      }
      console.log('try문 끝');
    } catch (err) {
      console.error('에러 발생:', err);
    }

  })
})
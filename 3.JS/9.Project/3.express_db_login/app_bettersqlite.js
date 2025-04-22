const sqlite = require('better-sqlite3');
const db = sqlite('users.db');
const express = require('express');
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.post('/login', (req, res) => {
  console.log('/login POST 요청 들어옴, 바디:', req.body);

  // const username = req.body.username;
  // const password = req.body.password;

  const { username, password } = req.body;
  const selectUser = db.prepare('SELECT user, password FROM users WHERE user = ?');
  const user = selectUser.get(username);
  console.log(`/login 조회한 사용자: ${user.user}, ${user.password}`);

  if (user && user.password === password) {
    res.send("로그인 성공");
  } else {
    res.send("로그인 실패");
  }

})

app.listen(port, (req, res) => {
  console.log(`${port}번 포트에서 서버 리슨 중`);
})
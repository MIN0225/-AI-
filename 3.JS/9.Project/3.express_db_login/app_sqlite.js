const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('users.db');
const express = require('express');
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', async (req, res) => {
  console.log('/login POST 요청 들어옴');
  const { username, password } = req.body;
  console.log(`username: {username}, password: {password}`);

  db.get("SELECT username, password FROM users WHERE username = ?", [username], (err, row) => {
    if (row) res.send("로그인 성공")
    else res.send("로그인 실패")
  });
})


app.listen(port, (req, res) => {
  console.log(`${port}번 포트에서 서버 리슨 중`);
})
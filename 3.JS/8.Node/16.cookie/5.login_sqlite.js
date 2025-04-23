const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

const users = [
  {id: 1, username: 'user1', password: 'password1'},
  {id: 2, username: 'user2', password: 'password2'},
]

const db = new sqlite3.Database('users.db');

app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
}))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);



  db.get('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, row) => {
    if (row) {
      req.session.user = {username: row.username, password: row.password}
      res.json({message: '로그인 성공'})
    } else {
      res.status(401).json({ message: "로그인 실패" });
    }
  });
});

app.get('/user', (req, res) => {
  const user = req.session.user;

  if (user) {
    const { username, password } = req.session.user;
    res.send(`당신은 계정명은 ${username} 비밀번호는 ${password} 입니다`);
  } else {
    res.send("user 없음");
  }
  res.send(`당신의 아이디는 ${username}, 비밀번호는: ${password} 입니다.`);
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send("로그아웃");
})

app.listen(port, (req, res) => {
  console.log(`${port}번 포트에서 리슨 중`)
})
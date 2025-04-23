const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

const users = [
  {id: 1, username: 'user1', password: 'password1'},
  {id: 2, username: 'user2', password: 'password2'},
]

app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
}))

app.get('/', (req, res) => {
  req.session.destroy();
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    // req.session.username = username;
    // req.session.password = password;
    req.session.user = { username, password };
    // console.log(`세션: ${JSON.stringify(req.session)}`)
    res.json({ message: '로그인 성공' })


  } else {
    res.status(401).json({ message: '로그인 실패' });
  }
});

app.get('/user', (req, res) => {
  const user = req.session.user;

  if (user) {
    const { username, password } = req.session.user;
    res.send(`당신은 계정명은 ${username} 비밀번호는 ${password} 입니다`);
  } else {
    res.send("user 없음");
  }

  
  // const username = JSON.stringify(req.session.username);
  // const password = JSON.stringify(req.session.password);
  // // console.log(`req.session: ${req.session}, req.session.username: ${req.session.username}, req.session.password: ${req.session.password}`);
  // console.log(`username: ${username}, password: ${password}`);
})

app.listen(port, (req, res) => {
  console.log(`${port}번 포트에서 리슨 중`)
})
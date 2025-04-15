const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;
const users = [];
let nextId = 1;

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'users.html'));
})

app.get('/users', (req, res) => {
  const userMap = {};
  users.forEach(user => {
    if (user) {
      userMap[user.id] = user;
    }
  })
  res.json(userMap);
})

app.post('/users', (req, res) => {
  const user = {
    id: nextId++,
    nickname: req.body.nickname,
    name: req.body.name,
    age: req.body.age
  };
  users[user.id] = user;
  res.send(`${user.name} POST 성공`);
})

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (users[id]) {
    users[id] = {
      id,
      nickname: req.body.nickname,
      name: req.body.name,
      age: req.body.age
    };
    res.send(`ID: ${id} Name: ${req.body.name} PUT 성공`);
  } else {
    res.status(404).send('유저가 존재하지 않음');
  }
})

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (users[id]) {
    delete users[id];
    res.send(`ID: ${id}번 DELETE 완료`)
  } else {
    res.status(404).send('유저가 존재하지 않습니다.');
  }
})

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 리슨 중`);
})
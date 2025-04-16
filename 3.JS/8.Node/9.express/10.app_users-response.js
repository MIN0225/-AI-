const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const users = {};
let nextId = 1;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // payload를 (즉, data 영역을) 파싱해서 req.body()에 담아달라

app.get('/', (req, res) => {
  console.log('메인홈');
  res.sendFile(path.join(__dirname, 'public', 'users.html'));
})

app.use(express.static('public'));


app.get('/users', (req, res) => {
  console.log('/users GET 요청 들어옴');
  console.log('요청 안에 뭐가 있나?', req);
  // res.send(users); // text/html 문자열
  res.json(users); // application/json
})

app.post('/users', (req, res) => {
  console.log('/users POST 요청 들어옴');

  try {
    
    const name = req.body.name;
    
    users[nextId++] = name;
    // res.send(`${req.body.name} 성공`);
    res.status(201).send('등록 성공');
  } catch (error) {
    res.status(500).send('서버 내부 오류');
  }
})

app.put('/users/:id', (req, res) => {
  console.log('/users:id PUT 요청 들어옴');
  try {
    const id = req.params.id;
    if (users[id]) { 
      users[id] = req.body.name;
      res.send(`${id}: ${req.body.name} PUT 성공`);
    } else {
      res.status(404).send('유저가 존재하지 않음');
    }
  } catch (error) {
    res.status(500).send('서버 내부 오류');
  }
})

app.delete('/users/:id', (req, res) => {
  console.log('/users:id DELETE 요청 들어옴');
  try {
    const id = req.params.id;
    if (users[id]) { 
      delete users[id];
      res.status(204).send();
    } else {
      res.status(404).send(`해당 사용자(ID:${id}는 존재하지 않습니다.`);
    }
  } catch (error) {
    res.status(500).send('서버 내부 오류');
  }
})

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 돌고 있음`);
})
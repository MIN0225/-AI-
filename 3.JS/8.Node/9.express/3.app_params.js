const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id; // 위의 가변 인자는 req.params 안에 담겨서 온다
  res.send(`사용자 정보, ID: ${req.params.id}`);
});

app.get('/users/:id/:profile', (req, res) => {
  const id = req.params.id; // 위의 가변 인자는 req.params 안에 담겨서 온다
  res.send(`사용자 정보, ID: ${req.params.id} profile: ${req.params.profile}`);
});

// search?keyword=programming&category=javascript
app.get('/search', (req, res) => {
  const keyword = req.query.keyword; // 쿼리 파라미터는 req.query 안에 담겨서 옴
  const category = req.query.category; // 쿼리 파라미터의 category 라는 key의 값을 가져옴

  res.send(`키워드 ${keyword}, 카테고리: ${category}`);
})

app.listen(port, () => {
  console.log(`서버 레디 on ${port}`);
})
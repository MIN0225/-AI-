const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/', (req, res) => {
  res.send('POSST 메세지 잘 받았음.');
});

app.put('/', (req, res) => {
  res.send('PUT 요청 잘 받았음');
});

app.delete('/', (req, res) => {
  res.send('내가 시킨대로 잘 삭제하겠음');
});

app.listen(port, () => {
  console.log(`서버 레디 on ${port}`);
})

app.get('/user', (req, res) => {
  res.send('사용자 정보조회');
});
app.post('/user', (req, res) => {
  res.send('사용자 정보 생성');
});
app.put('/user', (req, res) => {
  res.send('사용자 정보 수정');
});
app.delete('/user', (req, res) => {
  res.send('사용자 정보 삭제');
});
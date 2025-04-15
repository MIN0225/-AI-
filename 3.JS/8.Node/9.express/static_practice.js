const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 정적 파일 제공 연습
app.use('/static', express.static(path.join(__dirname, '/public/images')));

app.get('/', (req, res) => {
  const directory = path.join(__dirname, '/');
  console.log('directory:', directory);
  res.send('get 요청 응답');
})

app.listen(port, () => {
  console.log('서버 리슨 중');
})
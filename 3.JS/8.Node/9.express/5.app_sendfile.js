const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('public')); // 우리의 홈에 있는 public 폴더를 정적 폴더로 정의함

app.get('/', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'public', 'index.html');
  console.log('htmlFilePath:', htmlFilePath);
  res.sendFile(htmlFilePath);
})

app.listen(port, () => {
  console.log('서버 열림');
})
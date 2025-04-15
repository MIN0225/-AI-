const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

function myMiddleware(req, res, next) {
  console.log(`Mylog: ${req.method}, ${req.url}`);
  req.myData = 9999;
  req.requestTime = Date.now();
  next();
}

app.use(myMiddleware);

app.get('/', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'public', 'index.html');
  // console.log('htmlFilePath:', htmlFilePath);
  console.log(req.myData);
  const date = new Date(req.requestTime);
  console.log(`요청 시간: ${date.toLocaleString()}`);
  res.sendFile(htmlFilePath);
})

app.listen(port, () => {
  console.log('서버 열림');
})

app.use(express.static('public')); // 우리의 홈에 있는 public 폴더를 정적 폴더로 정의함
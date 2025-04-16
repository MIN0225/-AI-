const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json()); // 사용자의 입력을 파싱해서 req.body에 담아라.

app.post('/api/chat', (req, res) => {
  const question = "Echo: " + req.body.question;
  console.log(question);
  res.json({question});
})

app.listen(port, (req, res) => {
  console.log(`${port}번 포트에서 서버 리슨 중`);
})
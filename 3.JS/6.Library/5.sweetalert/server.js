const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(__dirname, `2example.html`);
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('입력값: ', email, password);

  await setMaxIdleHTTPParsers(2000);
  
  res.json({ message: '로그인에 성공하였습니다.' });
})


const port = 3000;
app.listen(port, () => {
  console.log("서버 레디");
})
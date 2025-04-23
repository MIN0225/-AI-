const express = require('express');
const cookieParser = require('cookie-parser'); // cookie-parser불러와서
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser); // 미들웨어에 넣어주면 파싱 알아서 해줌

app.get('/', (req, res) => {
  res.cookie('your_number', '1234');

  res.send('은행방문 & 접수완료');
})

app.get('/readcookie', (req, res) => {
  const yourcookie = req.cookies;
  console.log("가져온 쿠키는: ", yourcookie);
  res.send(`니가 가져온 쿠키는: ${JSON.stringify(yourcookie)}`);
})

app.listen(port, (req, res) => {
  console.log(`${port}번 포트에서 서버 리슨 중`);
})
const express = require('express');
const morgan = require('morgan');
const port = 3000;
const app = express();

const data = Array.from({ length: 223 }, (_, i) => `Item ${i + 1}`);

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/get-items', (req, res) => {
  const { start, end } = req.query;
  const userItems = data.slice(start, end);

  res.json(userItems);
})

app.get('/get-total', (req, res) => { // data 길이 응답
  res.json({ total: data.length });
})

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 리슨 중`);
})
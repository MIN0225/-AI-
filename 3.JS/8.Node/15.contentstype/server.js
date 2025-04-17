const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.get('/input', (req, res) => {
  res.json(input);
})

app.post('/submit-json', (req, res) => {
  const jsonData = req.body;
  console.log('jsonData:', jsonData);
  // res.send("응답"); // 기본 응답값은 200
  // res.status(201); // 응답값의 헤더에 201로 세팅해서, 바디는 아무것도 안 보냄

  const reply = {
    result: 'success',
    message: '잘 받았음'
  }
  // res.status(200).send(reply);
  res.send(reply); // 위랑 같음
})

app.post('/submit-form', (req, res) => {
  const jsonData = req.body;
  console.log('jsonData:', jsonData);

  res.send(jsonData);
})

app.listen(port, () => {
  console.log('서버 레디');
})

app.post('/submit-text', (req, res) => {
  const formData = req.body;
  console.log('formData:', formData);

  res.send(formData);
})

app.listen(port, () => {
  console.log('서버 레디');
})
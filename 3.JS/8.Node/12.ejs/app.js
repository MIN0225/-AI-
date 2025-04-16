const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// 템플릿 엔진 설정. ejs라는 걸 사용할 예정 (express가 기본 지원)
app.set('view engine', 'ejs'); // views라는 폴더 안의 ejs 파일을 찾는다

app.get('/', (req, res) => {

  // index를 찾아서
  res.render('index', {title: '나의 타이틀', message: 'EJS 학습중입니다.'});
});

app.listen(port, () => {
  console.log('서버 레디');
});
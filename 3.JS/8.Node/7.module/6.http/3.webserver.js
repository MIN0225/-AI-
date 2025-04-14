// 미션. 파일을 읽어서, 그 내용을 전달하는 서버 만들기
// 1. index.html 파일을 읽어서, 변수에 담아두고
// 2. req가 왔을 때, 그 변수의 내용을 전달한다.

const http = require('http');
const fs = require('fs');

const index = fs.readFileSync('./index.html', 'utf8');
// 실제로는 예외처리를 해줘야함. 일단 지금은 무시

// 2. 웹서버 만들기
const server = http.createServer((req, res) => {
  // console.log('req:', req);
  // console.log('res:', res);
  res.writeHead(200);
  res.end(index);
})

server.listen(3000, () => {
  console.log('서버가 3000번 포트를 잘 리슨하고 있습니다. 지금부터 사용자의 요청을 기다리겠습니다.');
});
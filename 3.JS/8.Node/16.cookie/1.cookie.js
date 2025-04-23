// 요즘 시에 이렇게 코딩하지 않음. 이론 섦명을 위함
const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
  res.end('쿠키 받아가시오');
});

server.listen(3000, () => {
  console.log("서버 레디");
})
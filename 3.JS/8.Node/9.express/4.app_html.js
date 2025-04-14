const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const index = fs.readFileSync('index.html', 'utf8');

// 미션: 파일 읽어서 전달하는 것으로 구현해보기
app.get('/', (req, res) => {
  // res.send(`
  //     <html>
  //       <head>
  //         <title>헬로우 익스프레스</title>
  //       </head>
  //       <body>
  //         <h1>헬로우 익스프레스</h1>
  //       </body>
  //     </html>
  //   `)

  // res.send(index);

  fs.readFile('index.html', 'utf8', (err, data) => {
    console.log('파일 읽기', data);
    res.send(data);
  })
})

app.listen(port, () => {
  console.log('서버 열림');
})
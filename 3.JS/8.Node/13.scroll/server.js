const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = 3000;

let data = Array.from({ length: 203 }, (_, i) => `Item ${i + 1}`);

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/get-items", (req, res) => {
  // 미션 2. 원하는 개수만큼만 보내주려면 어떻게 설계??
  //        입력 파라미터를 어떻게 정해야 할까??
  // query 파라미터로 GET으로, start = 10, end = 20 변수에 담아줄거다.
  // 미션 2-1. 그래서, 난 어떻게 이 많은 걸 나눌까
  // 미션 2-2. 이걸 구현.

  // const start = req.query.start;
  // const end = req.query.end;

  const { start, end } = req.query;
  console.log(start, end);

  // for (let i = start; i < end; i++) {
  //   userItems.push(data[i])
  // }
  // console.log(userItems);
  const userItems = data.slice(start, end);

  res.json(userItems);
});

app.listen(port, () => {
  console.log(`${port}번 포트 서버 리슨 중`);
});

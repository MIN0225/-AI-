const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const sqlite = require("sqlite3");
const path = require("path");

const routes = require('./routes'); // index.js

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // req.body 안에 프론트엔드에서 보낸 json에 담긴다.
app.use(
  session({
    secret: "this-is-my-password",
    resave: false, // 변경 없어도 매번 저장할 거냐?
    saveUninitialized: false, // 초기화 안 된 것도 저장할 거냐?
  })
);
app.use(express.static("public"));

app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
  console.log("서버 레디");
});
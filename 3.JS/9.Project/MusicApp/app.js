const express = require("express");
const morgan = require("morgan");
const sqlite = require("sqlite3");
const path = require("path");
const fs = require("fs");
const port = 3000;

const app = express();
const db = new sqlite.Database("music.db");

function initDatabase() {
  const sql = fs.readFileSync("init_database.sql", "utf8");
  db.exec(sql, (err) => {
    if (err) {
      console.error("DB 초기화 실패:", err.message);
    } else {
      console.log("DB 초기화 완료!");
    }
  });
}

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// 라우터
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// REST API
app.get("/api/musics", (req, res) => {
  const query = "SELECT * FROM music";
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ message: "DB 음악 조회 오류" });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get('/api/musics/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const search = `%${keyword}%`; // LIKE용 와일드카드

  const query = 'SELECT * FROM music WHERE title LIKE ? OR artist LIKE ? OR hashtag LIKE ?';

  db.all(query, [search, search, search], (err, rows) => {
    if (err) {
      console.error('SQLite query 에러:', err.message);
      res.status(500).json({ error: 'Database Error' });
    }
    res.json(rows);
  })
})

app.listen(port, (req, res) => {
  console.log("서버 레디");
  // initDatabase();
});
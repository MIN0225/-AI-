const express = require("express");
const morgan = require("morgan");
const sqlite = require("sqlite3");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

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
app.use(express.json());

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

app.get("/api/musics/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  const search = `%${keyword}%`; // LIKE용 와일드카드

  const query =
    "SELECT * FROM music WHERE title LIKE ? OR artist LIKE ? OR hashtag LIKE ?";

  db.all(query, [search, search, search], (err, rows) => {
    if (err) {
      console.error("SQLite query 에러:", err.message);
      res.status(500).json({ error: "Database Error" });
    }
    res.json(rows);
  });
});

app.post("/api/register", (req, res) => {
  const { username, password, email } = req.body;
  const query = "SELECT * FROM user WHERE username = ?";
  db.get(query, [username], async (err, row) => {
    if (err) {
      res.status(500).json({ message: "서버 DB 유저 조회 에러" });
    } else if (row) {
      res.status(400).json({ message: "이미 가입된 회원입니다." });
    } else {
      const setSalt = 10;
      const hashedPassword = await bcrypt.hash(password, setSalt);
      const query = 'INSERT INTO user (username, password, email) VALUES(?, ?, ?)';

      db.run(query, [username, hashedPassword, email], function (err) {
        if (err) {
          res.status(500).json({ message: 'DB 회원 정보 삽입 에러' });
        } else {
          res.status(200).json({ message: 'DB 회원 정보 삽입 완료', id:this.lastID})
        }
      })
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM user WHERE username = ?';
  db.get(query, [username], async (err, row) => {
    if (err) {
      res.status(500).json({ message: "로그인: DB 유저 조회 에러" });
    } else if (row) {
      const match = await bcrypt.compare(password, row.password);
      if (match) {
        res.status(200).json({ message: "로그인 성공" });
      } else {
        res.status(401).json({ message: "비밀번호가 틀렸습니다." });
      }
    }
    else {
      res.status(404).json({ message: "가입된 사용자가 없습니다." });
    }
  });
});

app.listen(port, (req, res) => {
  console.log("서버 레디");
  // initDatabase();
});

const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const sqlite = require("../7.tweet_refactoring/node_modules/sqlite3/lib/sqlite3");
const path = require("path");

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

const db = new sqlite.Database("database.db", (err) => {
  if (err) {
    console.error("DB 연결 실패");
  } else {
    console.log("DB 연결 성공");
    // SQLite에서 외래키 기능 활성화
    db.run("PRAGMA foreign_keys = ON");
  }
});

function loginRequired(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "로그인이 필요합니다" });
  }
  next();
}

// 메인 API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.get(query, [email], (err, user) => {
    if (err || !user || user.password !== password) {
      // 나중에는 bcrypt로 암호화 된 걸로 비교해야 됨
      return res.status(401).json({ error: "로그인에 실패하였습니다." });
    }
    
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    
    res.json({ message: "로그인 성공" });
  });
});

app.post("/api/logout", loginRequired, (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "로그아웃 성공!" });
  });
});

app.get("/api/tweets", loginRequired, (req, res) => {
  const query = `
  SELECT *
  FROM tweet
  JOIN users ON tweet.user_id = users.id
  ORDER BY tweet.id DESC
  `;
  
  db.all(query, [], (err, tweets) => {
    if (res.session.user) {
      const userId = req.session.user.id;
      
      const queryLike = "SELECT tweet_id FROM like WHERE user_id = ?";
      db.all(queryLike, [userId], (err, likes) => {
        const likedTweetIds = likes.map((like) => like.tweet_id);
        // 조회한 글에서 내가 좋아하는 글이 있는지 확인해서 true/false를 해당 글 뒤에 붙여서 반환
        const result = tweets.map((tweet) => ({
          ...tweet,
          liked_by_current_user: likedTweetIds.includes(tweet.id),
        }));
      });
    } else {
      res.json(
        tweets.map((tweet) => ({ ...tweet, liked_by_current_user: false }))
      );
    }
  });
});



app.post("/api/tweet", loginRequired, (req, res) => {
  const { content } = req.body;
  
  const query = "INSERT INTO tweet (content, user_id) VALUES(?, ?)";
  db.run(query, [content, req.session.user.id], (err) => {
    if (err) {
      return res
      .status(500)
      .json({ error: "트윗 작성 실패", detail: err.message });
    } else {
      res.json({ message: "트윗 작성 완료" });
    }
  });
});

app.post("/api/like/:tweet_id", loginRequired, (req, res) => {
  const tweetId = req.params.tweet_id;
  
  const query = "INSERT INTO like(user_id, tweet_id) VALUES(?, ?)";
  db.run(query, [req.session.user.id, tweetId]);
  // like를 증가시켰을 때, tweet 테이블의 like_count를 자동으로 증가하도록 trigger 써보기
  
  const query2 = "UPDATE tweet SET likes_count = likes_count + 1 WHERE id = ?";
  db.run(query2, [tweetId]);
  
  res.json({ message: "성공" });
});

app.post("/api/unlike/:tweet_id", loginRequired, (req, res) => {
  const tweetId = req.params.tweet_id;
  
  const query = "DELETE FROM like WHERE user_id=? AND tweet_id=?";
  db.run(query, [req.session.user.id, tweetId]);  
  const query2 = "UPDATE tweet SET likes_count = likes_count - 1 WHERE id = ?";
  db.run(query2, [tweetId]);
  
  res.json({ message: "성공" });
});

const port = 3000;

app.listen(port, () => {
  console.log("서버 레디");
});

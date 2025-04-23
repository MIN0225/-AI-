const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const sqlite3 = require("sqlite3");
const path = require("path");
const sqlite = require("sqlite3");

const app = express();
const port = 3000;
const db = new sqlite.Database("shopping.db", (err) => {
  if (!err) console.log("DB 연결 성공");
});

app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: "password 1010",
    resave: false,
    saveUninitialized: true,
  })
);

// public 폴더 노출
app.use(express.static("public"));

// 각종 라우터
app.get("/", (req, res) => res.redirect("/home"));
app.get("/home", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "home.html"))
);
app.get("/cart", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "cart.html"))
);
app.get("/products", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "products.html"))
);

// REST API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username=? AND password=?";

  db.get(query, [username, password], (err, row) => {
    if (err) console.log("오류");
    if (row) {
      req.session.user = { id: row.id, username: row.username };
      res.json({ message: "로그인 성공" });
    } else {
      res.status(401).json({ message: "로그인 실패" });
    }
  });
});

app.get("/api/check-login", (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({ message: "Welcome back", username: req.session.username });
  } else {
    res.status(401).json({ message: "not logged in" });
  }
});

app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.all(query, [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/api/cart/:productId", (req, res) => {
  const productId = Number(req.params.productId);
  const cart = req.session.cart || [];
  const query = "SELECT * FROM products WHERE id=?";

  db.get(query, [productId], (err, product) => {
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    console.log(product);
    // 무조건 주석 쓰면서 생각하기!!
    
    const existingItem = cart.find((item) => item.id === productId)
    // 담기 전에, 일단 있는지 확인
    if (existingItem){
      // 있으면 숫자를 증가한다.
      // existingItem.quantity++;
      existingItem.quantity += 1;
      // existingItem.quantity = existingItem.quantity + 1;
    } else {
    // 없으면 새로 추가.
      cart.push({ ...product, quantity: 1 });
    }

    req.session.cart = cart;
    res.json({ message: "상품 추가 완료" });
  });
});

app.get("/api/cart", (req, res) => {
  const cart = req.session.cart || []; // 장바구니에 물건 담은적이 없이
  console.log("내 카트:", cart);
  res.json({ cart });
});

// 메인 서버 시작
app
  .listen(port, () => {
    console.log("서버 레디");
  })
  .on("error", (err) => {
    console.error("서버 실행 중 오류 발생:", err.message);
  });

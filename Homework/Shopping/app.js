const express = require('express');
const sqlite = require('sqlite3');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');

const port = 3000;
const db = new sqlite.Database('shopping.db');

app = express();

// 미들웨어
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'abcdabba1234',
  resave: false,
  saveUninitialized: true,
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 라우터
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
})
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
})
app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product.html'));
})
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
})

// REST API
app.post('/api/login', (req, res) => {
  // id, 비밀번호 받아온다
  const {username, password} = req.body;
  // db에 저장된 id, password와 일치하는지 확인
  const query = 'SELECT * FROM users WHERE username=? AND password=?';

  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.log("db 에러");
    } else {
      if (row) {
        // 일치하면 세션에 id, password 저장
        req.session.user = { id: row.id, username: row.username };
        // 로그인 성공 응답 보내기
        res.json({ message: '로그인 성공' });
      } else {
        res.status(401).json({ message: "로그인 실패" });
      }
    }
  })
})

app.get('/api/session-users', (req, res) => {
  res.json(req.session.user);
})

app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.all(query, (err, rows) => {
    if (err) {
      console.log('상품 테이블 오류');
    } else {
      console.log(`rows: ${JSON.stringify(rows)}`);
      res.json(rows);
    }
  })
})

app.post('/api/products/:productid', (req, res) => {
  const productId = req.params.productid;
  console.log(`productId: ${productId}`);
  const query = 'SELECT * FROM products WHERE id=?';
  db.get(query, [productId], (err, row) => {
    if (err) {
      console.error('상품 추가 에러');
      return res.status(500).json({ error: '상품 조회 실패' });
    }
    if (!row) {
      return res.status(404).json({ error: '해당 상품을 찾을 수 없습니다.' });
    }

    if (!req.session.cart) req.session.cart = []; // 세션에 카트 배열 없으면 초기화

    // 이미 담긴 상품인지 확인
    const existingProduct = req.session.cart.find(p => p.id === row.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      req.session.cart.push({
        id: row.id,
        name: row.name,
        price: row.price,
        quantity: 1
      })
    }

    res.status(200).json({ message: '상품을 장바구니에 담았습니다.', cart: req.session.cart });
  });
});

app.get('/api/carts', (req, res) => {
  const cart = req.session.cart || [];
  res.json(cart);
})

app.patch('/api/carts/plus/:productid', (req, res) => {
  const productId = req.params.productid;

    // 카트가 없으면 초기화
    if (!req.session.cart) {
      req.session.cart = [];
    }

  const product = req.session.cart.find(p => Number(p.id) === Number(productId));
  console.log(`product: ${product}`);
  if (product) {
    product.quantity++;
    res.json({ message: '상품 quantity 증가', cart: req.session.cart });
  } else {
    res.status(404).json({ message: '상품이 장바구니에 없음' });
  }
})

app.patch('/api/carts/minus/:productid', (req, res) => {
  const productId = req.params.productid;

  // 카트가 없으면 초기화
  if (!req.session.cart) {
    req.session.cart = [];
  }

  const product = req.session.cart.find(p => Number(p.id) === Number(productId));
  console.log(`product: ${product}`);
  product.quantity--;

  if (product && product.quantity > 0) {
    product.quantity--;
    res.json({ message: '상품 quantity 감소', cart: req.session.cart });
  } else {
    res.stauts(404).json({ message: '상품 quantity 감소', cart: req.session.cart });
  }

})

app.delete('/api/products/:productid', (req, res) => {
  const productId = req.params.productid;
  
  if (!req.session.cart) {
    res.status(400).json({ message: '장바구니가 비어 있습니다.' });
  }

  const index = req.session.cart.findIndex(p => p.id == productId); 

  if (index !== -1) {
    req.session.cart.splice(index, 1); // index번째 상품 삭제
    res.json({ message: '상품이 장바구니에서 삭제되었습니다.', cart: req.session.cart });
  } else {
    res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
  }
})

app.get('/api/products/totals', (req, res) => {
  // cart가 없으면 빈 배열로 초기화
  const cart = req.session.cart || [];

  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = req.session.cart[i];
    sum += item.price * item.quantity;
  }
  res.json({ total: sum });
})


app.listen(port, (req, res) => {
  console.log(`${port}번 포트에서 서버 리슨 중`);
})

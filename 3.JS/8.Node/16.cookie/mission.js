const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const db = new sqlite3.Database('users.db');

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'this-is-my-password',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login2.html'));
});

app.get('/user', (req, res) => {
    const user = req.session.user;

    if (user) {
        const { username, password } = req.session.user;
        res.send(`안녕하세요 ${username} 님`);
    } else {
        res.send('로그인하고오시오...');
    }
});

app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (rows) {
      console.log(`row: ${JSON.stringify(rows)}`);
      req.session.product = rows;
      res.json(rows);
    }
  })
})

app.post('/add', (req, res) => {
  if (!req.session.user) {
    console.log("로그인 안 되어 있음");
    return res.status(401).send("로그인 먼저 하세요");
  }
  
  const product = req.body;
  console.log(`product: ${product}`);

  if (!req.session.cart) {
    req.session.cart = [];
  }

  req.session.cart.push(product);

  res.send(`장바구니 담음 product: ${product}`);
  console.log("res.send()완료");
})

app.get('/carts', (req, res) => {
  if (!req.session.user) {
    console.log("/carts GET API 호출. 로그인 안 되어 있음");
    res.status(401).send("로그인을 먼저 해주세요");
  }
  cartProducts = req.session.cart;

  console.log(`cartProducts: ${JSON.stringify(cartProducts)}`);
  res.json(cartProducts);
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send(`안녕히가세요...`);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    
    db.get('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, row) => {
        if (row) {
            req.session.user = { username: row.username, password: row.password }
            res.json({ message: '로그인 성공' });
        } else {
            res.status(401).json({ message: '로그인 실패'});
        }
    })
});

app.listen(port, () => {
    console.log('서버레디');
});
const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

const db = new sqlite.Database('users.db');

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  { id: 3, username: 'user3', password: 'password3' },
];

async function insertUsers() {
  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);

    db.get('SELECT * FROM users WHERE username=?', [username], async (err, row) => {
      if (row) {
        const isMatch = await bcrypt.compare[password, row.password];
        if (isMatch) {
          req.session.user = { username: row.username, password: row.password }
          res.json({ message: '로그인 성공' });
        }
      } else {
        res.status(401).json({ message: "로그인 실패" });
      }
    })


    // db.run(`INSERT INTO users (username, password) VALUES (?, ?)`,
    //   [user.username, hash],
    //   (err) => {
    //     console.log(`${user.username}: ${hash} 등록 성공`)
    //   }
    // );
  }
}
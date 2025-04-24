const express = require('express');
const morgan = require('morgan');
const sqlite = require('sqlite3');
const path = require('path');
const fs = require('fs');

const port = 3000;

const app = express();
const db = new sqlite.Database('memo.db');

function initDatabase() {
  const sql = fs.readFileSync('init_database.sql', 'utf8');
  db.exec(sql, (err) => {
    if (err) {
      console.error('DB 초기화 실패:', err.message);
    } else {
      console.log('DB 초기화 완료!');
    }
  })
}

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 라우터
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


// REST API
app.post('/api/memos', (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO memo (title, content) VALUES (?, ?)';
  db.run(query, [title, content], function (err) {
    if (err) {
      console.log('삽입 에러', err.message);
      res.status(500).json({ message: 'DB 삽입 에러' });
    } else {
      console.log('/api/memos 삽입 완료 id:', this.lastID);
      res.status(200).json({message: '삽입 완료', id: this.lastID})
    }
  })
})

app.patch('/api/memos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const query = 'UPDATE memo SET title = ?, content = ? WHERE id = ?';
  db.run(query, [title, content, id], (err) => {
    if (err) {
      console.log('수정 에러');
      res.status(500).json({ message: 'DB 메모 수정 에러' });
    } else {
      console.log('메모 수정 완료');
      res.status(200).json({ message: 'memo 수정 완료' });
    }
  })
})

app.get('/api/memos', (req, res) => {
  const query = 'SELECT * FROM memo';
  db.all(query, (err, rows) => {
    if (err) {
      console.log('메모 불러오기 에러');
      res.status(500).json({ message: 'DB 메모 불러오기 에러' });
    } else {
      console.log('메모 불러오기 완료');
      res.status(200).json({ memos: rows });
    }
  })
})

app.delete('/api/memos/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM memo WHERE id = ?';
  db.run(query, [id], (err) => {
    if (err) {
      console.log('메모 삭제 에러');
      res.status(500).json({ message: 'DB 메모 삭제 에러' });
    } else {
      console.log('메모 삭제 완료');
      res.status(200).json({message: `DB ${id} 메모 삭제 완료`})
    }
  })
})

app.listen(port, (req, res) => {
  console.log("서버 레디");
  // initDatabase();
})
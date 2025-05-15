// 내가 짠 거
const db = require('../models/database')

function getAllTodos(req, res) {
  const rows = db.prepare('SELECT * FROM todos').all();
  const todos = rows.map(row => ({
    id: row.id,
    text: row.text,
    completed: row.completed
  }))
  res.json(rows);
}

function addTodo(req, res) {
  const { text } = req.body;
  
  const stmt = db.prepare('INSERT INTO todos(text) VALUES (?)');
  const info = stmt.run(text);

  res.json({message: "ok"})
}
// function addTodo(req, res) {
//   const stmt = db.prepare('INSERT INTO todos(text) VALUES (?)');
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ error: '투두 내용이 필요합니다.' });
//   }

//   const info = stmt.run(text);

//   if (info.changes > 0) {
//     res.status(201).json({
//       id: info.lastInsertRowid,
//       text,
//       completed: 0
//     });
//   } else {
//     res.status(500).json({ error: '투두 추가에 실패' });
//   }
// }

function toggleTodo(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: '투두 id 필요' });
  }

  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);

  if (!todo) {
    return res.status(404).json({ error: '해당 id todo 찾을 수 없음' });
  }

  const newStatus = todo.completed === 0 ? 1 : 0;

  const stmt = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
  const info = stmt.run(newStatus, id);
}

// function deleteTodo(req, res) {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({error: 'todo ID가 필요'})
//   }

//   const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
//   if (!todo) {
//     return res.status(404).json({error: '해당 id 투두 찾을 수 없음'})
//   }

//   const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
//   const info = stmt.run(id);

//   if (info.changes > 0) {
//     res.json({ message: "투두 삭제 완료", id });
//   } else {
//     res.status(500).json({ error: "todo 삭제에 실패" });
//   }
// }

module.exports = {
  getAllTodos,
  addTodo,
  toggleTodo,
  deleteTodo
}
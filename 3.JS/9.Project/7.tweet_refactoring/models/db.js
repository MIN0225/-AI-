const sqlite = require('sqlite3');

const db = new sqlite.Database('database.db', (err) => {
  if (err) {
    console.error('DB연결 실패');
  } else {
    console.log('DB연결 성공');
    db.run('PRAGMA foreign_keys = ON');
  }
});

module.exports = {
  db,
};
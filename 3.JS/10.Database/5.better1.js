const sqlite = require('better-sqlite3');

const db = new sqlite('test.db');

db.exec(`CREATE TABLE IF NOT EXISTS greetings(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT
)`);

const insert = db.prepare('INSERT INTO greetings (message) VALUES (?)');
insert.run('Hello, BetterSQLite3!');

const select = db.prepare('SELECT * FROM greetings');
const greetings = select.all();

greetings.forEcah((row) => {
  console.log('인사: ', row.id, row.message)
})
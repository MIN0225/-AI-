const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("test.db");

function runQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      // pending, fulfilled, rejected
      db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
}

(async ()=> {
  await runQuery('CREATE TABLE IF NOT EXISTS messages (text TEXT)');
  await runQuery("INSERT INTO messages (text) VALUES (?)", ['Hello, SQLite!']);
}) ();
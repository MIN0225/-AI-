CREATE TABLE IF NOT EXISTS memo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT,
  image TEXT
);

INSERT INTO memo(title, content) VALUES ('제목1', '내용1');
INSERT INTO memo(title, content) VALUES ('제목2', '내용2');
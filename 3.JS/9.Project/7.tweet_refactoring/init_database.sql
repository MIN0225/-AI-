-- 사용자 테이블

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

-- 트윗 테이블

CREATE TABLE IF NOT EXISTS tweet (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  likes_count INTEGER DEFAULT 0, -- 3정규화에 의해 like 테이블을 항상 참조하지 않도록 여기에 합산 포함
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 좋아요 테이블

CREATE TABLE IF NOT EXISTS like (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  tweet_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(tweet_id) REFERENCES tweet(id)
);

-- 샘플 데이터도 여기서 넣어보기 (실무에서는 당연히 여기서 안 넣음)
-- 주의사항2. 실무에서는 당연히 비밀번호는 암호화 해야 함.

INSERT INTO users(username, email, password) VALUES
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2'),
('user3', 'user3@example.com', 'password3');

INSERT INTO tweet(content, user_id, likes_count) VALUES
('안녕하세요', 1, 0),
('두 번째 글 작성', 2, 0);


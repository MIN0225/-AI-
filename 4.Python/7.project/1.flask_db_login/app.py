import sqlite3
from flask import Flask, send_file, request

app = Flask(__name__)

@app.route("/")
def home():
  return send_file("static/index.html")

@app.route("/login", methods=["POST"])
def login():
  # DB 접속 및 입출력을 위한 포인터 (즉 커서)를 가져오기
  username = request.form["username"]
  password = request.form["password"]
  print("폼 입력:", username, password)

  conn = sqlite3.connect('users.db')
  cur = conn.cursor()

  cur.execute('SELECT username, password FROM user WHERE username=? AND password=?', (username, password))
  user = cur.fetchone()

  conn.close()

  if user:
    return "로그인 성공"
  else:
    return "로그인 실패"

if __name__ == "__main__":
  app.run(port=5001, debug=True)
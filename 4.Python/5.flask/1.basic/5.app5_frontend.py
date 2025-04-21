from flask import Flask, render_template

app = Flask(__name__)

users = ['Alice', 'Bob', "Charlie", "David", 'Eve', 'Kim']

@app.route("/")
def home():
  return render_template("index.html", name="john")

@app.route("/users")
def get_users():
  return render_template("users.html", users=users)

if __name__ == "__main__":
  app.run(port=5001, host="0.0.0.0", debug=True) # <-- 커밋하는 코드에서 이러면 잘못된 것. 프로덕션 코드에서는 절대로 debug=True로 배포하면 안 됨

from flask import Flask, render_template

app = Flask(__name__, static_folder=None) # 기본으로 허용된 static 폴더 끄기
app = Flask(__name__, static_folder='my_static') # 기본으로 허용된 static 폴더명을 my_static

@app.route("/")
def base():
  return render_template("base.html", text="hello Heom")

@app.route("/login", methods=["POST", "GET"])
def login():
  return render_template("login.html")


@app.route("/user")
def user():
  return render_template("user.html")

if __name__ == '__main__':
  app.run(port=5001, debug=True)

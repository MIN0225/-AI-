from flask import Flask, render_template, redirect, request, url_for

app = Flask(__name__)

@app.route("/")
def home():
  return render_template("index.html")

@app.route("/login", methods=["POST", "GET"])
def login():
  if request.method == "POST":
    user = request.form["name"]
    print("폼 입력:", user)
    return redirect(url_for("user", user=user))
  # return render_template() 해도 됨
  else:
    return render_template("login.html")
  
@app.route("/user")
@app.route("/user/<user>")
def user(user=None):
  return render_template("user.html", user=user)

if __name__ == "__main__":
  app.run(port=5001, debug=True)
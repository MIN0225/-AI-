from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

users = [
  {"id": 1, "name": "Alice", "age": 11, "phone": "123-3243-0041"},
  {"id": 2, "name": "Bob", "age": 21, "phone": "643-3863-2341"},
  {"id": 3, "name": "Charlie", "age": 31, "phone": "234-6743-2701"},
  {"id": 4, "name": "Alice", "age": 41, "phone": "321-3472-2541"},
]

@app.route("/")
def main():
  return "메인"

@app.route("/users")
def get_users():
  return jsonify(users) # 헤더에 application/json 도 넣고, dict로 json으로 변환하고.. (물론 똑같지만)

@app.route("/users/<int:user_id>")
def get_user_by_id(user_id):
  user = None
  for u in users:
    if u['id'] == user_id:
      user = u
      break # 찾았으면 중단하는 게, 효율적인 검색
  # 위에 있는 5줄 코드를 한줄로 표현하기
  # user = next((user for user in users if user['id'] == user_id), None)

  if user is not None:
    return jsonify(user)
  else:
    return jsonify({"error": "User not found"}), 404

@app.route("/search") # /search?name=Alice
def search_user():
  query = request.args.get('name')
  if not query:
    data = {"error": "name is required."}
    response = make_response(jsonify(data))
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

  results = [user for user in users if query.lower() in user['name'].lower()]
  return jsonify(results)

if __name__ == "__main__":
  app.run(port=5001)

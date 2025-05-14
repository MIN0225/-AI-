import os
from flask import Flask, request, jsonify, send_from_directory
# from database_copy import create_vector_db, answer_question
# from database import create_vector_db, answer_question
from database2 import initialize_vector_db, create_vector_db, answer_question

DATA_DIR = './DATA'

if not os.path.exists(DATA_DIR):
  os.makedirs(DATA_DIR)

app = Flask(__name__)

@app.route('/')
def index():
  return send_from_directory('static', 'index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
  global chain
  file = request.files['file']
  if file:
    file_path = os.path.join(DATA_DIR, file.filename)
    file.save(file_path)

    create_vector_db(file_path)
    return jsonify({"message": "파일이 성공적으로 업로드 되었습니다."})
  else:
    return jsonify({"error": "파일이 없습니다"}), 400

@app.route('/ask', methods=['POST'])
def ask_question():
  data = request.get_json()
  question = data.get('question', '')
  print('질문은: ', question)
  answer = answer_question(question)
  return jsonify({"answer": answer}), 200

if __name__ == '__main__':
  initialize_vector_db()
  app.run(debug=True)
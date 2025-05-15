const express = require('express');
const router = express.Router();
const db = require('../models/database')

const { OpenAI } = require('openai');

require('dotenv').config();

const openai = new OpenAI();

router.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  const reply = await requestChatGPT(question);

  let answer;

  // 챗봇에게 사용자 말을 전달하고, 그거에 따른 액션을 취해서 반환하게 해야 함..
  // 그 액션에 따라서.. 수행할 행동은 내가 코딩해야 함...
  let jsonReply = JSON.parse(reply)
  const { action, item } = reply;
  
  const todos = todoModel.getAllTodos();

  switch (action) {
    case 'add':
      // 구현하기
      todoModel.addTodo(item);
      answer = '추가했음'
      break;
    case 'done':
      var findItem = todos.find(t => t.text.include(item));
      todoModel.updateTodoState(findItem.id, 1);
      answer = '완료처리했음'
      break;
    case 'delete':
      var findItem = todos.find(t => t.text.include(item));
      todoModel.deleteTodoById(findItem.id);
      answer = '삭제했음'
      break;
  }

  return res.send({answer: `${reply}`})
})

async function requestChatGPT(userInput) {
  const prompt = `
    너는 투두 리스트에 대응하는 챗봇이야.
    사용자의 질문에 따라 "add", "done", "delete"의 액션을 선택할 수 있어.
    답변은 아무런 설명도 없이 json으로만 답변해야 해.
  `;


  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: '너는 투두 리스트에 대응하는 챗봇입니다.'},
      { role: 'user', content: userInput}
    ],
    temperature: 0.2
  })

  let content = response.choices[0].message.content.trim();
  return content;
}

module.exports = router;
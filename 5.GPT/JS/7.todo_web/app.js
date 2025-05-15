const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path')
const todoRoutes = require('./routes/todoRoutes');
const chatbot = require('./routes/chatbot')
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public', 'index.html')));

app.use(todoRoutes);
app.use(chatbot);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
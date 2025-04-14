const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'index.html');
  console.log('htmlFilePath:', htmlFilePath);
  res.sendFile(htmlFilePath);
})

app.listen(port, () => {
  console.log('서버 열림');
})
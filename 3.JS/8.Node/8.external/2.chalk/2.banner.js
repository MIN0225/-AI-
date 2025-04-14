// const figlet = require('figlet');
import figlet from 'figlet';

figlet('Hello Coding World!', (err, data) => {
  if (err) {
    console.log('에러:', err);
    return;
  }
  console.log(data);
})
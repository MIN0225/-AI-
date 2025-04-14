// 별다른 말이 없으면, 우리는 commonjs 방식을 쓴다.

const fs = require('fs'); // 지금은 빌트인 모듈의 fs를 가져오는 것

// function myCallbackFunction(err, data) {
//   if (err) {
//     console.error('에러가 있음 에러:', err);
//   } else {
//     console.log('에러가 없음. 데이터:', data);
//   }
// }

// fs.readFile('example.txt', 'utf8', myCallbackFunction);

console.log('파일 읽기 전');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('에러가 있음 에러:', err);
  } else {
    console.log('에러가 없음. 데이터:', data);
  }
});

console.log('파일 읽은 후');
// 별다른 말이 없으면, 우리는 commonjs 방식을 쓴다.

const fs = require('fs'); // 지금은 빌트인 모듈의 fs를 가져오는 것


console.log('파일 읽기 전');

const data = fs.readFileSync('example.txt', 'utf8');
console.log('데이터는', data);

console.log('파일 읽은 후');
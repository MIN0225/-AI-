// 별다른 말이 없으면, 우리는 commonjs 방식을 쓴다.

const fs = require('fs'); // 지금은 빌트인 모듈의 fs를 가져오는 것


console.log('파일 쓰기 전');

const data = '내가 파일에 쓰고 싶은 내용2';

fs.writeFile('example.txt', data, {encoding: 'utf8', flag: 'a'}, (err) => {
  if (err) {
    console.log('에러가 있음. 에러:', err);
  } else {
    console.log('에러가 없음. 쓰기 완료');
  }
});


console.log('파일 쓴 후');
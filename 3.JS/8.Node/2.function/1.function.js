function greet(name) {
  const greeting = '안녕하세요, ' + name;
  console.log(greeting);
  return greeting;
}

// 출력 함수
function printScreen(text) {
  console.log(text);
}

// greet('토토로');
// printScreen(greet('김철수'));

function add(a, b) {
  return a + b;
}

// 뺄셈 함수

function sub(a, b) {
  return a - b;
}

// 곱셈 함수

function mul(a, b) {
  return a * b;
}

// 나눗셈 함수
function div(a, b) {
  if (isNaN(a / b) || !isFinite(a / b)) {
    console.log("계산할 수 없는 값입니다.");
    return;
  }
  return a / b;
}


// 다음 문제를 푸시오 (함수를 호출해서 화면에 결과를 출력)
// 1. 2 + 3 = ?
printScreen(add(2, 3));
// 2. 2 - 3 = ?
printScreen(sub(2, 3));
// 3. 2 * 3 = ?
printScreen(mul(2, 3));
// 4. 2 / 3 = ?
printScreen(div(2, 3));
// 5. 2 * 0 = ?
printScreen(mul(2, 0));

// 6. 2 / 0 = ?
printScreen(div(2, 0));

// 7. 6번의 오류를 해결하시오...

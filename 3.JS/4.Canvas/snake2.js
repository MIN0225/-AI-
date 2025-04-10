const GAME_SPEED = 200; // ms (화면 갱신 주기)
const BLOCK_SIZE = 20; // 블록 크기

let snake = {
  x: BLOCK_SIZE,
  y: BLOCK_SIZE,
  directionX: 1,
  directionY: 0,
}; // 뱀의 시작 위치

let food = { x: 120, y: 120 };

let direction = "right";
let canvas;


// DOM과 각종 필요한 여러 컴포넌트 로딩이 끝난 이후 이거 실행하라
window.onload = initialize;

function initialize() {
  canvas = document.getElementById("snakeCanvas");
  context = canvas.getContext("2d");

  // 키 이벤트 리스너
  document.addEventListener("keydown", setupEventListeners);

  // 게임 시작 루프 호출
  setInterval(gameLoop, GAME_SPEED);
}

// 여기는 키보드 인터럽트(이벤트) 핸들러
function setupEventListeners() {
  document.addEventListener("keydown", (ev) => {
    switch (ev.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  });
}

function gameLoop() {
  // 뱀 이동
  moveSnake();

  // 화면 렌더링
  draw();
}

// 뱀의 위치를 이동한다
function moveSnake() {
  switch (direction) {
    case "up":
      snake.y -= BLOCK_SIZE;
      break;
    case "down":
      snake.y += BLOCK_SIZE;
      break;
    case "left":
      snake.x -= BLOCK_SIZE;
      break;
    case "right":
      snake.x += BLOCK_SIZE;
      break;
  }

  // 화면을 벗어나지 않게... 오른쪽 끝 -> 왼쪽 끝에서 나오기 (vice versa)
  //                    위로 -> 아래로 나오기 (vice versa)
  if (snake.x > canvas.width - BLOCK_SIZE) {
    snake.x = canvas.width - BLOCK_SIZE;
  }
  if (snake.x < 0) {
    snake.x = 0;
  }
  if (snake.y > canvas.height - BLOCK_SIZE) {
    snake.y = canvas.height - BLOCK_SIZE;
  }
  if (snake.y < 0) {
    snake.y = 0;
  }
}

// 화면에 뱀을 그린다
function draw() {
  // 화면 클리어
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // 사과 그리기
  if (snake.x === food.x && snake.y === food.y) {
    food.x = Math.floor(Math.random() * canvas.width / BLOCK_SIZE) * BLOCK_SIZE;
    
  }
  
  // 사과 그리기
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, BLOCK_SIZE, BLOCK_SIZE);
  
  // 뱀 그리기
  context.fillStyle = "blue";
  context.fillRect(snake.x, snake.y, BLOCK_SIZE, BLOCK_SIZE);

}
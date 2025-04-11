const ROWS = 5; // 총 출력할 줄 수

function leftTriangle() {
  let currentRow = 1;
  while (currentRow <= ROWS) {
    let stars = "";
    let starCount = 1;
    while (starCount <= currentRow) {
      stars += "*";
      starCount++;
    }
    console.log(stars);
    currentRow++;
  }
}

function leftInvertedTriangle() {
  for (let i = 0; i < ROWS; i++) {
    let stars = '';
    for (let j = i; j < ROWS; j++){
      stars += '*';
    }
    console.log(stars);
  }
}

function rightTriangle() {
  for (let i = 0; i < ROWS; i++){
    let stars = "";
    for (let j = i + 1; j < ROWS; j++) {
      stars += ' ';
    }
    for (let k = 0; k <= i; k++){
      stars += '*';
    }
    console.log(stars);
  }
}

function rightInvertedTriangle() {
  for (let i = 0; i < ROWS; i++){
    let stars = '';
    for (let j = 0; j < i; j++){
      stars += ' ';
    }
    for (let k = 0; k < ROWS - i; k++){
      stars += '*';
    }
    console.log(stars);
  }
}

function doubleSidedTriangle() {
  for (let i = 1; i <= ROWS; i++){
    let stars = '';
    for (let j = 0; j < ROWS - i; j++){
      stars += ' ';
    }
    for (let k = 0; k < 2 * i - 1; k++){
      stars += '*';
    }
    console.log(stars);
  }
}

function doubleSidedInvertedTriangle() {
  for (let i = 1; i <= ROWS; i++){
    let stars = '';
    for (let j = 1; j < i; j++){
      stars += ' ';
    }
    for (let k = 0; k < (ROWS - i) * 2+ 1; k++){
      stars += '*';
    }
    console.log(stars);
  }
}

leftTriangle();
console.log();
leftInvertedTriangle();
console.log();
rightTriangle();
console.log();
rightInvertedTriangle();
console.log();
doubleSidedTriangle();
console.log();
doubleSidedInvertedTriangle();
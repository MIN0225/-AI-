function gugudan() {
  for (let i = 2; i <= 9; i++){
    console.log(`=== ${ i }단===`);
    for (let j = 1; j <= 9; j++){
      console.log(`${i} x ${j} = ${i * j}`);
    }
  }
}

gugudan();
// 미션1. 구구단을 완성하시오. 2단, ... 9단까지
// function sum_to_num(number) {
//   const answer = number * (number + 1) / 2;
//   console.log(answer);
//   return answer;
// }

function sum_to_num(number) {
  let sum = 0;
  for (let i = 1; i <= number; i++){
    console.log(`${sum} + ${i} = ${sum + i}`);
    sum += i;
  }
  console.log("합:", sum);
}

sum_to_num(10);
sum_to_num(49);
// 미션1. 주어진 숫자까지의 합을 구하시오
// 1부터 100까지의 합은? 5050
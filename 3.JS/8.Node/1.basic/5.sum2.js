let sum = 0;
// for (let i = 0; i < 10; i++) {
//   sum += 0.1;
// }
// console.log(sum);

function sum_gauss_num(number) {
  sum = (number * (number + 1)) / 2;
  console.log('가우스 공식을 활용한 합산사사산:', sum);
  return sum;
}

sum_gauss_num(100);
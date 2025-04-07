function increment(){
  console.log("증가버튼 클릭");
  let result = document.getElementById("result");
  result.innerText = Number(result.innerText) + 1;
}
function decrement() {
  console.log("감소버튼 클릭");
  let result = document.getElementById("result");
  if (Number(result.innerText) > 0) {
    result.innerText = parseInt(result.innerText) - 1;
  }

  // 숙제1. 감소할 때 0 이하로 내려가지 않게 만들기
}
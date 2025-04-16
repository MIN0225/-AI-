const NUM_OF_ITEMS_PER_PAGE = 10;
let start = 0;
let end = start + NUM_OF_ITEMS_PER_PAGE;

// 미션 1. 백엔드에 요청해서 데이터를 받아와서, 화면에 렌더링한다.
// 미션 1-1. 백엔드에 요청한다. fetch
// 미션 1-2. 데이터를 받아온다. res.xxxxx
// 미션 1-3. 화면에 렌더링한다. dom..xxxx

async function loading() {
  // const res = await fetch('/get-items');
  const res = await fetch(`/get-items?start=${start}&end=${end}`);
  const data = await res.json();

  const myContainer = document.getElementById('scroll-container');

  data.forEach((d) => {
    const item = document.createElement('div');
    item.textContent = d;
    item.classList.add('item'); // 디자인 속성 추가
    myContainer.appendChild(item);
  })
  // 오래된 DOM 찾아서 지우기

  start = end;
  end += NUM_OF_ITEMS_PER_PAGE;
}

document.addEventListener('DOMContentLoaded', () => {
  loading();
})

window.addEventListener('scroll', () => {
  // console.log('스크롤 위치: ', window.scrollY)
  // console.log('윈도우 높이:', window.innerHeight);
  // console.log('document.documentElement.scrollHeight:', document.documentElement.scrollHeight);
  const endOfScroll = (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1);
  // console.log('화면 끝?', endOfScroll);
  if (endOfScroll) {
    loading();
  }
})
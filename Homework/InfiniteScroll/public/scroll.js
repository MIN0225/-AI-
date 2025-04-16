const NUM_OF_ITEMS_PER_PAGE = 10;
let start = 0;
let end = start + NUM_OF_ITEMS_PER_PAGE;
let maxNum = 0;
let lastScrollY = 0;
let minStart = 0;
const MAX_ITEMS = 30; // 한 번에 유지할 DOM 최대 개수

async function loading(direction = "down") {
  const myContainer = document.getElementById("scroll-container");

  if (direction === "down") {
    if (start >= maxNum) return;

    const res = await fetch(`/get-items?start=${start}&end=${end}`);
    const data = await res.json();

    data.forEach((d) => {
      const item = document.createElement("div");
      item.textContent = d;
      item.classList.add("item");
      item.dataset.index = start;
      // console.log('item:', item);
      myContainer.appendChild(item);
    });

    // 오래된 DOM 찾아서 지우기
    const items = myContainer.querySelectorAll(".item");
    // console.log('items.length: ', items.length);

    if (items.length > MAX_ITEMS) {
      const excess = items.length - MAX_ITEMS;
      for (let i = 0; i < excess; i++) {
        myContainer.removeChild(items[i]);
      }

      if (items.length > 0 && items[excess]) {
        minStart = parseInt(items[excess].dataset.index); // 수정 필요
        console.log("minStart:", minStart);
      }
    }

    if (start < maxNum) {
      start = end;
      end += NUM_OF_ITEMS_PER_PAGE;
    }
  } else if (direction === "up") {
    if (minStart <= 0) return;

    const newEnd = minStart;
    const newStart = Math.max(0, newEnd - NUM_OF_ITEMS_PER_PAGE);
    console.log(`newStart: ${newStart} newEnd: ${newEnd}`);

    const res = await fetch(`/get-items?start=${newStart}&end=${newEnd}`);
    const data = await res.json();

    // 데이터를 원래 순서대로 처리하되, 각 항목을 컨테이너 앞쪽에 추가
    let fragment = document.createDocumentFragment(); // 성능 최적화를 위한 DocumentFragment 사용

    data.forEach((d, i) => {
      const item = document.createElement("div");
      item.textContent = d;
      item.classList.add("item");
      item.dataset.index = newStart + i;
      fragment.appendChild(item); // fragment에 순서대로 추가
    });

    // 완성된 fragment를 컨테이너 맨 앞에 한 번에 추가
    myContainer.prepend(fragment);

    minStart = newStart;
    console.log("minStart:", minStart);
  }
}

async function getTotal() {
  const res = await fetch("/get-total");
  console.log("res:", res);
  const json = await res.json();
  maxNum = json.total;
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("loaded! HTML 로드되고 파싱된 후 한 번만 실행됨");
  await getTotal();
  loading();
});

window.addEventListener("scroll", () => {
  // console.log('scroll위치:', window.scrollY);
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;
  const scrollingUp = currentScrollY < lastScrollY;

  const endOfScroll =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 1;
  if (endOfScroll && scrollingDown) {
    console.log("loading down!");
    loading("down");
  }

  if (scrollingUp && currentScrollY < 200) {
    console.log("loading up!");
    loading("up");
  }

  lastScrollY = currentScrollY;
});

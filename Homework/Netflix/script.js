let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// 현재 슬라이드 위치와 한 번에 이동할 아이템 개수 설정
let nowHotPosition = 0;
const slidesPerMove = 1; // 한 번에 몇 개씩 이동할지
const slideBoxWidth = 114; // 각 slide-box의 너비 (104px 이미지 + 10px gap)

// 슬라이드 이동 함수
function moveNowHotSlide(direction) {
  const slideWrapper = document.querySelector('.slide-container-wrapper');
  const slides = document.querySelectorAll('.slide-box');
  const slideContainer = document.querySelector('.slide-container');
  
  // 컨테이너 너비 (보이는 영역의 너비)
  const containerWidth = slideContainer.offsetWidth;
  console.log('containerWidth(보이는 영역의 너비):', containerWidth);

  const wrapperWidth = slides.length * slideBoxWidth;
  console.log('wrapperWidth:', wrapperWidth);

  const maxPixelOffset = Math.max(0, wrapperWidth - containerWidth);
  console.log('maxPixelOffset:', maxPixelOffset);
  
  // 최대 이동 위치 계산
  const maxPosition = Math.ceil(maxPixelOffset / slideBoxWidth);
  console.log('maxPosition:', maxPosition);
  
  if (direction === 'next' && nowHotPosition < maxPosition) {
    nowHotPosition += slidesPerMove;
    console.log("next클릭, nowHotPosition:", nowHotPosition);
  } else if (direction === 'prev' && nowHotPosition > 0) {
    nowHotPosition -= slidesPerMove;
    console.log("prev클릭, nowHotPosition:", nowHotPosition);
  }
  
  // 범위 체크 - 최소값 0, 최대값 maxPosition
  nowHotPosition = Math.max(0, Math.min(nowHotPosition, maxPosition));
  console.log('nowHotPosition:', nowHotPosition);

  let translateValue = -slideBoxWidth * nowHotPosition;
  console.log('translateValue:', translateValue);

  if (nowHotPosition >= maxPosition) {
    translateValue = -(maxPixelOffset + 20);
  }

  slideWrapper.style.transition = 'transform 0.5s ease';
  slideWrapper.style.transform = `translateX(${translateValue}px)`;
}
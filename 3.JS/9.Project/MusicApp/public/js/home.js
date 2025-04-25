document.addEventListener("DOMContentLoaded", async () => {
  const musicList = document.querySelector(".music-list");

  // DB에 저장된 모든 음악 표기
  displayMusic(musicList);

  // 검색
  document.getElementById("search").addEventListener("click", async (e) => {
    musicList.innerHTML = "";
    const keyword = document.getElementById("searchInput").value.trim();
    console.log("keyword:", keyword);
    const response = await fetch(`/api/musics/${encodeURIComponent(keyword)}`);
    const musics = await response.json();
    console.log("musics: ", musics);

    musics.forEach((music) => {
      const musicItem = document.createElement("div");
      musicItem.className = "music-item";

      const musicInfo = document.createElement("div");
      musicInfo.className = "music-info";

      const h3 = document.createElement("h3");
      const pSinger = document.createElement("p");
      const pHash = document.createElement("p");

      h3.textContent = music.title;
      pSinger.textContent = music.artist;
      pHash.textContent = music.hashtag;
      console.log(`${music.title}, ${music.artist}, ${music.hashtag}`);

      musicInfo.appendChild(h3);
      musicInfo.appendChild(pSinger);
      musicInfo.appendChild(pHash);
      musicItem.appendChild(musicInfo);
      musicList.appendChild(musicItem);
    });
  });
});

async function displayMusic(musicList) {
  console.log("displayMusic() 실행");
  musicList.innerHTML = "";

  const response = await fetch("api/musics");
  const musics = await response.json();

  musics.forEach((music) => {
    const musicItem = document.createElement("div");
    musicItem.className = "music-item";

    const musicInfo = document.createElement("div");
    musicInfo.className = "music-info";

    const h3 = document.createElement("h3");
    const pSinger = document.createElement("p");
    const pHash = document.createElement("p");

    h3.textContent = music.title;
    pSinger.textContent = music.artist;
    pHash.textContent = music.hashtag;

    musicInfo.appendChild(h3);
    musicInfo.appendChild(pSinger);
    musicInfo.appendChild(pHash);
    musicItem.appendChild(musicInfo);
    musicList.appendChild(musicItem);
  });
}
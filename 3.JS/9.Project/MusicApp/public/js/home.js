document.addEventListener('DOMContentLoaded', async () => {
  const musicList = document.querySelector('.music-list');
  
  const musicItem = document.createElement('div');
  musicItem.className = 'music-item';
  
  const musicInfo = document.createElement('div');
  musicInfo.className = 'music-info';

  
  const response = await fetch('api/musics');
  const musics = await response.json();
  console.log("musics: ", musics);

  musics.forEach(music => {
    const h3 = document.createElement('h3');
    const pSinger = document.createElement('p');
    const pHash = document.createElement('p');

    h3.textContent = music.title;
    pSinger.textContent = music.artist;
    pHash.textContent = music.hashtag;

    musicInfo.appendChild(h3);
    musicInfo.appendChild(pSinger);
    musicInfo.appendChild(pHash);
    musicItem.appendChild(musicInfo);
    musicList.appendChild(musicItem);
  })



  document.getElementById('search').addEventListener('click', async () => {
    const response = await fetch(`/api/musics/${keyword}`)
  })





})
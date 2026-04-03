

const songs = [
  {
    title: "Kesariya",
    artist: "Arijit Singh",
    src: "songs/kesariya.mp3"
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    src: "songs/perfect.mp3"
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    src: "songs/believer.mp3"
  }
]; 


const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

let currentSong = 0;


function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
}


function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}


function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
}


function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
}


audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});


progress.addEventListener("input", () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});0


volume.addEventListener("input", () => {
  audio.volume = volume.value;
});


function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}


function loadPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    let li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;

    li.onclick = () => {
      currentSong = index;
      loadSong(index);
      audio.play();
    };

    playlistEl.appendChild(li);
  });
}


audio.addEventListener("ended", nextSong);

// 🚀 Init
function initPlayer() {
  loadSong(currentSong);
  loadPlaylist();
  audio.volume = 0.5;
}

initPlayer();
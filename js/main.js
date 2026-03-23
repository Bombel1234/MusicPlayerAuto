const player = document.getElementById("player");
const playlistEl = document.getElementById("playlist");
const currentEl = document.getElementById("current");
const startPauseBtn = document.getElementById("startPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const timeEl = document.getElementById("time");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

const tracks = [
    { name: "O Ela, Ela (Official video)", url: "audio/D-Bomb - O Ela, Ela (Official video).mp3" },
    { name: "It's My Life (Official HD Video)", url: "audio/Dr.Alban - It's My Life (Official HD Video).mp3" },
    { name: "Ice MC - It's a Rainy Day [Official Video]", url: "audio/Ice MC - It's a Rainy Day [Official Video].mp3" }
];

let currentTrack = 0;
let isPlaying = false;

function renderPlaylist() {
    playlistEl.innerHTML = "";
    tracks.forEach((track, index) => {
        const li = document.createElement("li");
        li.textContent = track.name;
        li.addEventListener("click", () => { playTrack(index); player.play(); isPlaying = true; updatePlayPauseIcon(); });
        playlistEl.appendChild(li);
    });
}

function playTrack(index) {
    currentTrack = index;
    player.src = tracks[index].url;
    currentEl.textContent = `Текущий трек: ${tracks[index].name}`;
    updatePlaylistUI();
}

function updatePlaylistUI() {
    Array.from(playlistEl.children).forEach((li, idx) => {
        li.classList.toggle("active", idx === currentTrack);
    });
}

function updatePlayPauseIcon() {
    if (isPlaying) {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    } else {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }
}

startPauseBtn.addEventListener("click", () => {
    if (isPlaying) { player.pause(); isPlaying = false; }
    else { player.play(); isPlaying = true; }
    updatePlayPauseIcon();
});

prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    playTrack(currentTrack);
    if (isPlaying) player.play();
    updatePlayPauseIcon();
});

nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    playTrack(currentTrack);
    if (isPlaying) player.play();
    updatePlayPauseIcon();
});

player.addEventListener("ended", () => nextBtn.click());

function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2,"0");
    const s = Math.floor(sec % 60).toString().padStart(2,"0");
    return `${m}:${s}`;
}

player.addEventListener("timeupdate", () => {
    const percent = (player.currentTime / player.duration) * 100;
    progress.style.width = percent + "%";
    timeEl.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration || 0)}`;
});

progressContainer.addEventListener("click", e => {
    const rect = progressContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    player.currentTime = percent * player.duration;
});

renderPlaylist();
playTrack(0);
updatePlayPauseIcon();
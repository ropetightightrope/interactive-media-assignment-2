const video = document.getElementById("mouthVideo");
const audio = document.getElementById("mouthAudio");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const muteToggle = document.getElementById("muteToggle");
const playBtn = document.getElementById("playBtn");
const bgImage = document.getElementById("bgImage");

// === FULLSCREEN ===
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

fullscreenBtn.addEventListener("click", toggleFullscreen);
video.addEventListener("dblclick", toggleFullscreen);

// === MUTE/UNMUTE ===
function updateMuteIcon() {
  if (video.muted) {
    muteToggle.classList.add("muted");
    muteToggle.classList.remove("unmuted");
  } else {
    muteToggle.classList.remove("muted");
    muteToggle.classList.add("unmuted");
  }
}

function toggleMute() {
  video.muted = !video.muted;
  audio.muted = video.muted;
  updateMuteIcon();
}

muteToggle.addEventListener("click", toggleMute);
video.addEventListener("click", toggleMute);

// === PLAY/PAUSE ===
function updatePlayIcon() {
  if (video.paused) {
    playBtn.classList.remove("paused");
  } else {
    playBtn.classList.add("paused");
  }
}

playBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    audio.play();
  } else {
    video.pause();
    audio.pause();
  }
  updatePlayIcon();
});

video.addEventListener("play", () => {
  audio.play();
  updatePlayIcon();
});
video.addEventListener("pause", () => {
  audio.pause();
  updatePlayIcon();
});

// === SCROLL = BLUR ===
document.addEventListener("wheel", (e) => {
  const blur = Math.min(Math.max(e.deltaY / 50, 0), 15); // clamp blur 0–15px
  bgImage.style.filter = `blur(${blur}px)`;
});

// === INIT ===
video.autoplay = true;
video.muted = true;
video.playsInline = true;
video.load();
video.play().catch(() => {});

audio.muted = true;
audio.load();
audio.play().catch(() => {});

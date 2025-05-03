const video = document.getElementById("mouthVideo");
const audio = document.getElementById("mouthAudio");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const muteToggle = document.getElementById("muteToggle");
const playBtn = document.getElementById("playBtn");
const bgImage = document.getElementById("bgImage");

// ==== FULLSCREEN FUNCTIONALITY ====
// Toggle fullscreen on button click or video double-click.
// Makes the experience immersive, especially for art/video-based projects.
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

fullscreenBtn.addEventListener("click", toggleFullscreen);
video.addEventListener("dblclick", toggleFullscreen);

// ==== MUTE / UNMUTE LOGIC ====
// Updates icon class based on mute state.
// Syncs mute state for both video and audio.
function updateMuteIcon() {
  if (video.muted || audio.muted) {
    muteToggle.classList.add("muted");
    muteToggle.classList.remove("unmuted");
  } else {
    muteToggle.classList.remove("muted");
    muteToggle.classList.add("unmuted");
  }
}

function toggleMute() {
  const isMuted = video.muted;
  video.muted = !isMuted;
  audio.muted = !isMuted;
  updateMuteIcon();
}

// Toggle mute by clicking icon or video
muteToggle.addEventListener("click", toggleMute);
video.addEventListener("click", toggleMute);

// ==== PLAY / PAUSE CONTROLS ====
// Toggles icon state and syncs audio/video playback.
// Ensures audio follows video state perfectly.
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

// ==== SCROLL = BACKGROUND BLUR ====
// Adds depth and interactivity by linking scroll to blur intensity.
// Enhances immersion with minimal UI clutter.
document.addEventListener("wheel", (e) => {
  const blur = Math.min(Math.max(e.deltaY / 50, 0), 15);
  bgImage.style.filter = `blur(${blur}px)`;
});

// ==== INITIALIZATION ====
// Sets autoplay/muted/loop to match UX goals.
// Audio autoplay is blocked by browser unless user interacts.
document.body.addEventListener(
  "click",
  () => {
    video.muted = false;
    audio.muted = false;

    video.play().catch((err) => console.warn("Video play failed:", err));
    audio.play().catch((err) => console.warn("Audio play failed:", err));

    updateMuteIcon();
  },
  { once: true }
);
// Trigger only once
// ==== POP-UP WARNING LOGIC ====
// Warns user about high volume and prompts interaction.
// Unlocks audio/video playback after first click.
const popupOverlay = document.getElementById("popupOverlay");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  video.muted = false;
  audio.muted = false;
  video.play();
  audio.play();
  updateMuteIcon();
});

// --- Speech Synthesis Setup ---
const speedDisplay = document.getElementById("speed");
const PKD = document.getElementById("audioFile");

const synth = window.speechSynthesis;
let currentRate = 1.0;

// --- Scroll to change da speed pls ---
window.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    currentRate = Math.min(currentRate + 0.1, 3);
  } else {
    currentRate = Math.max(currentRate - 0.1, 0.1);
  }

  speedDisplay.textContent = currentRate.toFixed(1);
});

// Audio file Upload and playback speed linkkkkkkkkkkkkkkkkkkkkkkkkkk ---
const audioFile = document.getElementById("audioFile");

audioFile.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const audioURL = URL.createObjectURL(file);
    audioFile.src = audioURL;
    audioFile.playbackRate = currentRate;
    audioFile.load();
  }
});

document.body.addEventListener("click", () => {
  if (audioFile.paused) {
    audioFile.play();
  } else {
    audioFile.pause();
  }
});

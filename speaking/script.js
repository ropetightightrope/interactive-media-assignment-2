// --- Speech Synthesis Setup ---
const txtInput = document.querySelector("#txtInput");
const voiceList = document.querySelector("#voiceList");
const buttonSpeak = document.querySelector("#buttonSpeak");
const buttonStop = document.querySelector("#buttonStop");
const speedDisplay = document.getElementById("speed");
const PKD = document.getElementById("audioFile");

// --- play/pause audio file ---
// audioFile.play();
// audioFile.pause();

const synth = window.speechSynthesis;
let voices = [];
let currentRate = 1.0;

PopulateVoices();
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = PopulateVoices;
}

function PopulateVoices() {
  voices = synth.getVoices();
  let selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
  voiceList.innerHTML = "";
  voices.forEach((voice) => {
    const listItem = document.createElement("option");
    listItem.textContent = voice.name;
    listItem.setAttribute("data-lang", voice.lang);
    listItem.setAttribute("data-name", voice.name);
    voiceList.appendChild(listItem);
  });
  voiceList.selectedIndex = selectedIndex;
}

buttonSpeak.addEventListener("click", () => {
  const toSpeak = new SpeechSynthesisUtterance(txtInput.value);
  const selectedVoiceName =
    voiceList.selectedOptions[0].getAttribute("data-name");
  voices.forEach((voice) => {
    if (voice.name === selectedVoiceName) {
      toSpeak.voice = voice;
    }
  });
  toSpeak.rate = currentRate;
  synth.speak(toSpeak);
});

buttonStop.addEventListener("click", () => {
  synth.cancel();
});

// --- Scroll to change da speed pls ---
window.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    currentRate = Math.min(currentRate + 0.1, 3);
  } else {
    currentRate = Math.max(currentRate - 0.1, 0.1);
  }

  speedDisplay.textContent = currentRate.toFixed(1);

  // UPLOADED AUDIO THINGYYYYYYYYYYYYYYYYYYYYY
  if (!synth.speaking && audioFile.src) {
    audioFile.playbackRate = currentRate;
  }
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

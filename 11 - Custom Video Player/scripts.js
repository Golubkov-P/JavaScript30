const player = document.querySelector('.player__video');
const playButton = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const sliders = document.querySelectorAll('input[type=range]');
const skipButtons = document.querySelectorAll('button[data-skip]');

const PLAY_SYMBOL_CODE = '&#9658';
const PAUSE_SYMBOL_CODE = '&#10074&#10074';

function togglePlay() {
  player.paused ? play() : pause();
}

function play() {
  player.play();
  setPlayButtonIcon(PAUSE_SYMBOL_CODE);
}

function pause() {
  player.pause();
  setPlayButtonIcon(PLAY_SYMBOL_CODE);
}

function setPlayButtonIcon(symbol) {
  playButton.innerHTML = symbol;
}

function setProgress() {
  progressFilled.style.flexBasis = `${player.currentTime / player.duration * 100}%`;
}

function setValue({target}) {
  player[target.name] = target.value;
}

function skipTime({target}) {
  player.currentTime += parseInt(this.dataset.skip);
}

function seeking(e) {
  player.currentTime = player.duration / this.offsetWidth * e.offsetX;
}

playButton.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', setProgress);
sliders.forEach(slider => slider.addEventListener('input', setValue));
skipButtons.forEach(button => button.addEventListener('click', skipTime));

progress.addEventListener('mouseup', seeking);
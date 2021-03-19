const musicContainer = document.getElementById('music-container'),
  progressContainer = document.getElementById('progress-container'),
  progress = document.getElementById('progress'),
  audio = document.getElementById('audio'),
  title = document.getElementById('title'),
  cover = document.getElementById('cover'),
  playBtn = document.getElementById('play'),
  prevBtn = document.getElementById('prev'),
  nextBtn = document.getElementById('next');

// Song titles
// they should match with the title .mp3 in music folder
// the images the same
const songs = ['energy', 'summer', 'creativeminds'];

// Keep track of song
let songIndex = 2;

// Inialially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const {
    duration,
    currentTime
  } = e.srcElement;
  // console(duration, currentTime);
  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);

  // Set it to the width of the progress of the element
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  // console.log(width); // total width 216

  // Get where we click
  const clickX = e.offsetX;
  // console.log(clickX);

  // Get the complete duration of the song
  const duration = audio.duration;

  // Set the current time of the audio to the right position
  audio.currentTime = (clickX / width) * duration;
}

// Event Listener
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
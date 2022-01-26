import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

setCurrentTime();
player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime(data) {
  localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
}

function setCurrentTime() {
  const currentTime = localStorage.getItem(LOCALSTORAGE_KEY);
  player.setCurrentTime(currentTime);
}

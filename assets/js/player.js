
import { Player } from './models.js';
import { imgClean } from './cards.js';

/* CREAZIONE DEL PLAYER */
export const player = new Player();

/* RECUPERO ELEMENTI HTML */
const playerCover = document.querySelector('.player-cover img');
const playerTitle = document.querySelector('.player-title');
const playerArtist = document.querySelector('.player-artist');
const btnPlay = document.querySelector('.btn-play');
const playIcon = btnPlay.querySelector('.material-symbols-rounded');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const progressFill = document.querySelector('.progress-fill');

const volumeControl = document.querySelector('.volume-control');
const iconVolume = document.querySelector('.player-right .material-symbols-rounded');

/* AGGIORNAMENTO INFORMAZIONI PLAYER */
export function updatePlayer(track) {
    playerCover.src = imgClean(track.artworkUrl100, 600);
    playerTitle.textContent = track.trackName;
    playerArtist.textContent = track.artistName;

    currentTime.textContent = '0:00';
    duration.textContent = '0:00';
    progressFill.style.width = '0%';

    playIcon.textContent = 'play_arrow';
}

/* AGGIORNAMENTO ICONA PLAY/PAUSA */
function updatePlayIcon() {
    playIcon.textContent = player.isPlaying ? 'pause' : 'play_arrow';
}

/* PLAY E PAUSA */
btnPlay.addEventListener('click', () => {
    if (!player.currentTrack) return;

    if (player.isPlaying) {
        player.pause();
    } else {
        player.play();
    }

    updatePlayIcon();
});

/* AGGIORNAMENTO DURATA E BARRA DI AVANZAMENTO */
player.audio.addEventListener('timeupdate', () => {
    const current = player.audio.currentTime;
    const total = player.audio.duration;

    if (!total) return;

    const percentage = (current / total) * 100;

    progressFill.style.width = `${percentage}%`;
    currentTime.textContent = formatTime(current);
    duration.textContent = formatTime(total);
});

/* RECUPERO DURATA BRANO */
player.audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(player.audio.duration);
});

/* AGGIORNAMENTO ICONE AUDIO */
player.audio.addEventListener('play', updatePlayIcon);
player.audio.addEventListener('pause', updatePlayIcon);
player.audio.addEventListener('ended', updatePlayIcon);

/* FORMATTAZIONE TEMPO */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

/* AGGIORNAMENTO ICONA VOLUME */
function updateIconVolume() {
    if (player.volume === 0) {
        iconVolume.textContent = 'volume_off';
    } else if (player.volume < 0.5) {
        iconVolume.textContent = 'volume_down';
    } else {
        iconVolume.textContent = 'volume_up';
    }
}

/* IMPOSTAZIONE VOLUME INIZIALE */
player.manageVolume(Number(volumeControl.value) / 100);
updateIconVolume();

/* MODIFICA VOLUME */
volumeControl.addEventListener('input', () => {
    player.manageVolume(Number(volumeControl.value) / 100);
    updateIconVolume();
});

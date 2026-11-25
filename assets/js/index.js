import { fetchJSON } from "./api.js";
import { Track } from './models.js';
import { player, updatePlayer } from './player.js';
 import {myPreferit, renderCard, gridFavorites } from './cards.js';
const gridPop = document.querySelector('#grid-pop');


const home = document.querySelector('.home');
const playerCover = document.querySelector('.player-cover img');
const playerTitle = document.querySelector('.player-title');
const playerArtist = document.querySelector('.player-artist');
const btnPlay = document.querySelector('.btn-play');
const playIcon = btnPlay.querySelector('.material-symbols-rounded');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const progressFill = document.querySelector('.progress-fill');

let tracks = [];

const loadPref = JSON.parse(localStorage.getItem('myPreferit')) ?? [] // se non c'e niente, array vuoto
myPreferit.push(...loadPref)
renderCard(myPreferit, gridFavorites)

const testFetch = async () => {
    // se funziona
    try {
        const ok = await fetchJSON('https://itunes.apple.com/search?term=pop&entity=song&limit=8');
         tracks = ok.results;
        renderCard(tracks, gridPop);
      
    }
    //se non funziona
    catch {
        const errore = await fetchJSON('https://itunes.apple.com/pagina-che-non-esiste');
        // console.log('risposta con errore:', errore);
    }
};
testFetch();

 export function create(tag, classes, texts) {
    const element = document.createElement(tag);
    if (classes) element.className = classes;
    if (texts !== undefined) element.textContent = texts;
    return element
}

export function savePreferit() {
    localStorage.setItem('myPreferit', JSON.stringify(myPreferit))
}

export function imgClean(url, size = 600) {
    if (!url) return '';
    return url.replace(/\d+x\d+bb/, `${size}x${size}bb`);
}

//1.add event listener su tutta la griglia section class home
home.addEventListener('click', (e) => {

    // ESCLUDO IL CLICK SUI PREFERITI
    if (e.target.closest('.btnPref, .btnPrefActive')) return;

    // INTERCETTO LA CARD
    const cardSelected = e.target.closest('.card-personal');

    if (!cardSelected) return;

    // RECUPERO L'ID DEL BRANO
    const cardSelectedId = Number(cardSelected.dataset.id);
    

    // CERCO IL BRANO NEI DATI DISPONIBILI
    const trackData = tracks.find((item) => item.trackId === cardSelectedId);

    if (!trackData) return;

    // CREO L'OGGETTO TRACK
    const track = new Track(trackData);

    // SELEZIONO IL BRANO
    player.select(track);

    // AGGIORNO IL PLAYER
    updatePlayer(track);

});

//2. function per update delle info per il player

// intercetto lo slide del volume
const volumeControl = document.querySelector(`.volume-control`);
const iconVolume = document.getElementById('volume-icon');


export function updatePlayer(track) {
    playerCover.src = imgClean(track.artworkUrl100, 600);
    playerTitle.textContent = track.trackName;
    playerArtist.textContent = track.artistName;
    currentTime.textContent = '0:00';
    duration.textContent = '0:00';
    progressFill.style.width = '0%';
}

//3. funzione per cambio bottone play
btnPlay.addEventListener('click', () => {

    if (!player.currentTrack) return;

    if (player.isPlaying) {
        player.pause();
        playIcon.textContent = 'play_arrow';
    } else {
        player.play();
        playIcon.textContent = 'pause';
    }

});

//4. addeventListener per la durata del brano, scorrimento della barra del brano in riproduzione
player.audio.addEventListener('timeupdate', () => {
    const current = player.audio.currentTime;
    const total = player.audio.duration;

    if (!total) return;

    const percentage = (current / total) * 100;

    progressFill.style.width = `${percentage}%`;
    currentTime.textContent = formatTime(current);
    duration.textContent = formatTime(total);
});

player.audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(player.audio.duration);
});

//  funzione per formattare il tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

// stilizzo icona in base al volume
function updateIconVolume() {
    //player.volume è un numero da 0 a 1
    if (player.volume === 0) {
        iconVolume.textContent = `volume_off`; // ICONA BARRATA
    } 
    else if (playerCover.volume < 0.5) {
        iconVolume.textContent = `volume_down`; // ALTOPARLANTE CON SINGOLA ONDA
    }
    else iconVolume.textContent = `volume_up`; // ALTOPARLANTE CON DUE ONDE
}

// alllineo il valore di partenza dello slider con l'audio
player.manageVolume(Number(volumeControl.value) /100);
//aggiorno l'icona
updateIconVolume();

// allo spostamento aggiorno volume ed icona 
volumeControl.addEventListener(`input`, () =>{
    player.manageVolume(Number(volumeControl.value) /100);
    updateIconVolume();
})
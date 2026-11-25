
# EpiTunes
 
<!-- TODO: screenshot principale -->
![Home di EpiTunes](docs/index.png)
 
<!-- TODO: link GitHub Pages -->
🔗 **Demo online:** [EpiTunes su GitHub Pages](INSERISCI-QUI-IL-LINK)
 
---
 
## 📖 Descrizione del progetto
 
Il progetto ha l'obiettivo didattico di riprodurre la piattaforma di riproduzione audio "Spotify" tramite l'utilizzo dell'[API di iTunes](https://itunes.apple.com/).
 
---
 
## 🛠️ Tecnologie utilizzate
 
- HTML5
- CSS3
- JavaScript Vanilla
- Bootstrap
---
 
## ✨ Funzionalità del progetto
 
- [ ] Layout con sidebar, contenuto centrale e player inferiore.
- [ ] Navigazione tra le pagine.
- [ ] Riproduzione audio reale.
- [ ] Play e pausa.
- [ ] Barra di avanzamento audio.
- [ ] Controllo volume.
- [ ] Cronologia dei brani riprodotti.
- [ ] Sistema dei preferiti.
- [ ] Salvataggio dei preferiti.
- [ ] Salvataggio dei preferiti in LocalStorage.
- [ ] Salvataggio dell'ultima ricerca.
- [ ] Utilizzo della iTunes Search API.
- [ ] Classi OOP `Track`, `Album`, `Artist`, `Player`.
---
 
## 📁 Struttura del progetto
 
### Le 4 pagine HTML
 
#### Layout comune
 
Div contenitore `app` con:
 
```html
<body>
  <div class="app">
    <aside class="sidebar"></aside>
    <main class="main">
      <header class="topbar">
        <div class="topbar-nav">
          <button class="nav-btn">‹</button>
          <button class="nav-btn">›</button>
          <a class="nav-btn mobile-only">🏠 🔍</a>
        </div>
        <div class="user-pill">Studente Epicode</div>
      </header>
      <!-- contenuto della pagina -->
    </main>
    <footer class="player"></footer>
  </div>
  <audio id="audio-element"></audio>
  <script type="module" src="..."></script>
</body>
```
 
#### Le pagine
 
- **[Home](index.html)**
```html
<section class="home"></section>
```
  - Riprodotti di recente.
  - I tuoi preferiti.
  - Suggerimenti musicali per genere.
- **[Cerca](search.html)**
```html
<section class="search">
  <div class="search-box">
    <input id="search-input" placeholder="Cerca un brano, un album, un artista...">
    <p id="last-search">Ultima ricerca:</p>
  </div>
  <div class="search-results">
    <section class="row" id="row-tracks" hidden>
      <h2>Brani</h2>
      <div class="grid" id="grid-tracks"></div>
    </section>
    <section class="row" id="row-albums" hidden>
      <h2>Album</h2>
      <div class="grid" id="grid-albums"></div>
    </section>
    <section class="row" id="row-artists" hidden>
      <h2>Artisti</h2>
      <div class="grid" id="grid-artists"></div>
    </section>
    <p id="search-empty">Nessun risultato</p>
  </div>
</section>
```
  - Input di ricerca con debounce di 400 ms.
  - Risultati divisi in brani, album e artisti.
- **[Album](album.html)**
```html
<section class="album-page">
  <div class="album-hero" id="album-hero"></div>
  <div class="hero-actions" id="album-actions"></div>
  <div class="tracklist" id="tracklist"></div>
</section>
```
  - Copertina e informazioni dell'album.
  - Tracklist dei brani.
  - Collegamento alla pagina dell'artista.
- **[Artista](artist.html)**
```html
<section class="artist-page">
  <div class="artist-hero" id="artist-hero"></div>
  <div class="hero-actions" id="artist-actions"></div>
  <div class="top-tracks" id="top-tracks"></div>
</section>
```
  - Informazioni sull'artista.
  - Top track.
### I file CSS
 
- **[style](assets/css/style.css)**
| Home | Search |
|------|--------|
| ![Schermata Home](docs/index.png) | ![Schermata Ricerca](docs/search.png) |
 
### I file JavaScript
 
La logica è stata impostata su base modulare per esportare le varie funzioni
 
- **[Index](assets/js/index.js)**
- **[api](assets/js/api.js)**
- **[models](assets/js/models.js)**
  - costruzione di classi Track,Album,Artist
  - costruzione di classe Player che fornisce la logica del brano attualmente in riproduzione.
```javascript
export class Player {
  constructor() {
    this.currentTrack = null;
    this.isPlaying = false;
    this.volume = 1;
    this.audio = new Audio();
    this.history = [];
  }
  play(track) {
    this.currentTrack = track;
    this.isPlaying = true;
    this.audio.src = track.previewUrl;
    this.audio.play();
    this.history.push(track);
  }
  pause(){
    this.isPlaying = false;
    this.audio.pause();
  }
  manageVolume(volume){
    this.volume = volume;
    this.audio.volume = volume;
  }
  seek(seconds){
    this.audio.currentTime = seconds;
  }
};
```
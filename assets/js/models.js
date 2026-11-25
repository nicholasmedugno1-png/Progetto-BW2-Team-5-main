// Federico -> Definizione classe Track all'interno del constructor si riceve un oggetto data ed all'interno del costruttore viene letto il valore della proprietà messo in export da importare in index.js

export class Track {
  constructor(data) {
    this.trackId = data.trackId;
    this.trackName = data.trackName;
    this.artistId = data.artistId;
    this.trackTimeMillis = data.trackTimeMillis || 0;
    this.artistName = data.artistName;
    this.collectionId = data.collectionId;
    this.collectionName = data.collectionName;
    this.previewUrl = data.previewUrl;
    this.artworkUrl100 = data.artworkUrl100;
  }
}

// classe album -> 

export class Album {
  constructor(data) {
    this.collectionId = data.collectionId;
    this.collectionName = data.collectionName;
    this.artistName = data.artistName;
    this.primaryGenreName = data.primaryGenreName;
    this.artistId = data.artistId;
    this.artworkUrl100 = data.artworkUrl100;
  }
}

export class Artist {
  constructor(data) {
    this.artistId = data.artistId;
    this.artistName = data.artistName;
    this.primaryGenreName = data.primaryGenreName;
  }
}

// non vengono passate proprietà all'interno del constructor perché non si sa in origine quale canzone verrà riprodotta


export class Player {
  constructor() {
    this.currentTrack = null;
    this.isPlaying = false;
    this.volume = 1;
    this.audio = new Audio();
    this.history = [];

    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
    });
  }

  select(track) {
    this.currentTrack = track;
    this.isPlaying = false;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  play() {
    if (!this.currentTrack || !this.currentTrack.previewUrl) return;

    this.audio.src = this.currentTrack.previewUrl;

    this.audio.play()
      .then(() => {
        this.isPlaying = true;

        const lastTrack = this.history[this.history.length - 1];

        if (lastTrack?.trackId !== this.currentTrack.trackId) {
          this.history.push(this.currentTrack);
        }
      })
      .catch((error) => {
        this.isPlaying = false;
        console.error("Riproduzione fallita:", error);
      });
  }

  pause() {
    this.isPlaying = false;
    this.audio.pause();
  }

  manageVolume(volume) {
    const safeVolume = Math.min(1, Math.max(0, volume));
    this.volume = safeVolume;
    this.audio.volume = safeVolume;
  }
  seek(seconds) {
    if (!this.currentTrack) return;
    this.audio.currentTime = seconds;
  }
}
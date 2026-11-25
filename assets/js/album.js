/* RECUPERO ID ALBUM DALL'URL */
const params = new URLSearchParams(window.location.search);
const albumId = params.get('id');

console.log(albumId);
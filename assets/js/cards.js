 export const myPreferit = [];
 export const gridFavorites = document.querySelector('#grid-favorites');
 export function create(tag, classes, texts) {
    const element = document.createElement(tag);
    if (classes) element.className = classes;
    if (texts !== undefined) element.textContent = texts;
    return element
}

export function renderCard(array, containerPadre) {
    containerPadre.textContent = ''
    array.forEach((item) => {

        const titleText = item.trackName ?? item.collectionName ?? '';
        const artistText = item.artistName ?? ''

        //DIV CONTENENTE TUTTA LA CARD
        const myDivCard = create('div', 'card-personal')//AGGIUNGERE CLASSI IL CONTENUTO E' L IMG
        myDivCard.dataset.id = item.trackId ?? item.collectionId
        //DIV DELL IMG DELLA CANZONE
        const myDivImg = create('div', 'myDivImg')//AGGIUNGERE CLASSI E CONTENUTO
        // myDivImg.classList.add('')
        const myImg = create('img')//AGGIUNGERE CLASSI E CONTENUTO
        // myImg.src = `${item.artworkUrl100}` 
        myImg.src = imgClean(item.artworkUrl100, 600);

        // APPEND DELL IMG AL DIV 
        myDivImg.append(myImg)
        const myDivTitle = create('div', 'myDivTitle')//AGGIUNGERE CLASSI IL CONTENUTO SONO GLI ELEMENTI DI SOTTO
        //PARAGRAFO CHE CONTIENE IL TITOLO DEL BRANO
        const mytitle = create('p', '', titleText); //AGGIUNGERE CLASSI E CONTENUTO
        //P CONTENENTE TITOLO ARTISTA
        const myArtist = create('p', '', artistText)//AGGIUNGERE CLASSI E CONTENUTO
        const id = item.trackId ?? item.collectionId
        const isPref = myPreferit.some((element) => (element.trackId ?? element.collectionId) === id);
        //BTN CHE CONTIENE L ICONA PREFERITI
        const btnPref = create('button', `btn ${isPref ? 'btnPrefActive' : 'btnPref'}`, isPref ? '★' : '☆');

        btnPref.addEventListener('click', (e) => {
            e.preventDefault()
            const index = myPreferit.findIndex((element) => (element.trackId ?? element.collectionId) === id)

            /* >>>>>>>>>> MODIFICATO: L'ICONA SI AGGIORNA DOPO, SU TUTTE LE COPIE */
            if (index !== -1) {
                myPreferit.splice(index, 1)

            } else {
                myPreferit.push(item)

            }
            savePreferit()

            const newIcon = index !== -1 ? '☆' : '★' // se c'era l'abbiamo tolto, se non c'era l'abbiamo messo
            const allButtons = document.querySelectorAll(`[data-id="${id}"] .btnPref, [data-id="${id}"] .btnPrefActive`)
            allButtons.forEach((button) => {
                button.textContent = newIcon
                button.classList.toggle('btnPrefActive', index === -1);
                button.classList.toggle('btnPref', index !== -1);

            })


            console.log(myPreferit)
            renderCard(myPreferit, gridFavorites)
        })

        myDivTitle.append(mytitle, myArtist, btnPref);
        myDivCard.append(myDivImg, myDivTitle);
        containerPadre.append(myDivCard)
    })
}


export function savePreferit() {
    localStorage.setItem('myPreferit', JSON.stringify(myPreferit))
}

export function imgClean(url, size = 600) {
    if (!url) return '';
    return url.replace(/\d+x\d+bb/, `${size}x${size}bb`);
}
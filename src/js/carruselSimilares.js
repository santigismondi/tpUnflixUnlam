const track = document.querySelector('.carrusel-track');
const btnPrev = document.querySelector('.carousel-btn.prev');
const btnNext = document.querySelector('.carousel-btn.next');

// verificamos si existe el carrusel en esta pagina
if (track && btnPrev && btnNext) {
    let currentIndex = 0;
    const visibleSlides = 4;

    // verificar si el JSON de peliculas existe
    if (typeof peliculasJSON !== 'undefined') {
        const similares = JSON.parse(peliculasJSON);

    similares.forEach(peli => {
        const link = document.createElement('a');
        link.href = `../html/detallePelicula.html?titulo=${encodeURIComponent(peli.titulo)}`;

        // contenedor para imagen y corazon
        const contenedor = document.createElement('div');
        contenedor.style.position = 'relative';
        contenedor.style.display = 'inline-block';

        const img = document.createElement('img');
        img.src = peli.portada;
        img.alt = peli.titulo;

        // icono de corazon
        const corazon = document.createElement('i');
        corazon.className = 'fa-regular fa-heart botonFavoritos';
        corazon.setAttribute('data-titulo-item', peli.titulo);


        contenedor.appendChild(img);
        contenedor.appendChild(corazon);
        link.appendChild(contenedor);
        track.appendChild(link);
});
    }

    // verificar si el JSON de series existe
    if (typeof seriesJSON !== 'undefined') {
        const seriesSimilares = JSON.parse(seriesJSON);

        seriesSimilares.forEach(serie => {
        const link = document.createElement('a');
            link.href = `../html/detalleSerie.html?titulo=${encodeURIComponent(serie.titulo)}`;

            // contenedor para imagen y corazon
            const contenedor = document.createElement('div');
            contenedor.style.position = 'relative';
            contenedor.style.display = 'inline-block';

            const img = document.createElement('img');
            img.src = serie.portada;
            img.alt = serie.titulo;

            // icono de corazon
            const corazon = document.createElement('i');
            corazon.className = 'fa-regular fa-heart botonFavoritos'; 
            corazon.setAttribute('data-titulo-item', serie.titulo);


            contenedor.appendChild(img);
            contenedor.appendChild(corazon);
            link.appendChild(contenedor);
            track.appendChild(link);
        });
    }
 


// logica de movimiento tipo carrusel
function moveCarousel() {
    const slideWidth = track.querySelector('a')?.offsetWidth || 0;
    const gap = 16; 
    const offset = (slideWidth + gap) * currentIndex;  //Calcula cuanto se debe mover el slide
    track.style.transform = `translateX(-${offset}px)`;
}

// boton siguiente
btnNext.addEventListener('click', () => {
    const totalSlides = track.querySelectorAll('a').length;
    if (currentIndex < totalSlides - visibleSlides) {
        currentIndex++;
        moveCarousel();
    }
});

// boton anterior
btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        moveCarousel();
    }
});

// reset al redimensionar ventana
window.addEventListener('resize', moveCarousel);
}
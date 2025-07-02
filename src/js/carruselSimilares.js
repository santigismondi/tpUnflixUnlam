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
            // contenedor para imagen y corazon
            const contenedor = document.createElement('div');
            contenedor.style.position = 'relative';
            //contenedor.style.display = 'inline-block';

            const link = document.createElement('a');
            link.href = `../html/detallePelicula.html?titulo=${encodeURIComponent(peli.titulo)}`;

            // icono de corazon
            const corazon = document.createElement('i');
            corazon.className = 'fa-regular fa-heart botonFavoritos';
            corazon.setAttribute('data-titulo-item', peli.titulo);

            const img = document.createElement('img');
            img.src = peli.portada;
            img.alt = peli.titulo;

            contenedor.appendChild(corazon);
            contenedor.appendChild(link);
            link.appendChild(img);
            track.appendChild(contenedor);
            });
    }

        // verificar si el JSON de series existe
    if (typeof seriesJSON !== 'undefined') {
        const similares = JSON.parse(seriesJSON);

        similares.forEach(serie => {
            // contenedor para imagen y corazon
            const contenedor = document.createElement('div');
            contenedor.style.position = 'relative';
            //contenedor.style.display = 'inline-block';

            const link = document.createElement('a');
            link.href = `../html/detalleSerie.html?titulo=${encodeURIComponent(serie.titulo)}`;

            // icono de corazon
            const corazon = document.createElement('i');
            corazon.className = 'fa-regular fa-heart botonFavoritos';
            corazon.setAttribute('data-titulo-item', serie.titulo);

            const img = document.createElement('img');
            img.src = serie.portada;
            img.alt = serie.titulo;

            contenedor.appendChild(corazon);
            contenedor.appendChild(link);
            link.appendChild(img);
            track.appendChild(contenedor);
            });
    }
 

// logica de movimiento tipo carrusel



function moveCarousel() {
    const slideWidth = track.querySelector('a')?.offsetWidth || 0;
    const gap = 16; 
    const offset = (slideWidth + gap) * currentIndex;
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
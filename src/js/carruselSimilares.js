const track = document.querySelector('.carrusel-track');
const btnPrev = document.querySelector('.carousel-btn.prev');
const btnNext = document.querySelector('.carousel-btn.next');

// Verificamos si existe el carrusel en esta página
if (track && btnPrev && btnNext) {
    let currentIndex = 0;
    const visibleSlides = 4;

    // Verificar si el JSON de películas existe
    if (typeof peliculasJSON !== 'undefined') {
        const similares = JSON.parse(peliculasJSON);

        similares.forEach(peli => {
            const link = document.createElement('a');
            link.href = `../html/detallePelicula.html?titulo=${encodeURIComponent(peli.titulo)}`;

            const img = document.createElement('img');
            img.src = peli.portada;
            img.alt = peli.titulo;

            link.appendChild(img);
            track.appendChild(link);
        });
    }

    // Verificar si el JSON de series existe
    if (typeof seriesJSON !== 'undefined') {
        const seriesSimilares = JSON.parse(seriesJSON);

        seriesSimilares.forEach(serie => {
            const link = document.createElement('a');
            link.href = `../html/detalleSerie.html?titulo=${encodeURIComponent(serie.titulo)}`;

            const img = document.createElement('img');
            img.src = serie.portada;
            img.alt = serie.titulo;

            link.appendChild(img);
            track.appendChild(link);
        });
    }
 

// Lógica de movimiento tipo carrusel



function moveCarousel() {
    const slideWidth = track.querySelector('a')?.offsetWidth || 0;
    const gap = 16; // si usás gap entre elementos, ajustalo acá
    const offset = (slideWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
}

// Botón siguiente
btnNext.addEventListener('click', () => {
    const totalSlides = track.querySelectorAll('a').length;
    if (currentIndex < totalSlides - visibleSlides) {
        currentIndex++;
        moveCarousel();
    }
});

// Botón anterior
btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        moveCarousel();
    }
});

// Reset al redimensionar ventana
window.addEventListener('resize', moveCarousel);
}
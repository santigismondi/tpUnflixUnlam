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
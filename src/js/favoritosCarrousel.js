function actualizarCorazonVisual(btnCorazon, isFavorite) {
    if (isFavorite) {
        btnCorazon.classList.remove('fa-regular');
        btnCorazon.classList.add('fa-solid');
    } else {
        btnCorazon.classList.remove('fa-solid');
        btnCorazon.classList.add('fa-regular');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const corazonesCarrousel = document.querySelectorAll('.carrusel-track .fa-heart');

    // unifica los arrays de pelis y series
    const arrayPeliculas = typeof PELICULAS !== "undefined" ? PELICULAS : [];
    const arraySeries = typeof SERIES !== "undefined" ? SERIES : [];
    const arrayPeliculasYseries = [...arrayPeliculas, ...arraySeries];

    corazonesCarrousel.forEach(boton => {
        const nombrePeliSerie = boton.getAttribute('data-titulo-item');
        let usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');
        let usuarioLogueado = usuarioLogueadoJSON ? JSON.parse(usuarioLogueadoJSON) : { favoritos: [] };
        if (!usuarioLogueado.favoritos) usuarioLogueado.favoritos = [];
        const indiceFavorito = usuarioLogueado.favoritos.findIndex(item => item.titulo === nombrePeliSerie);

        // Estado inicial del ícono
        actualizarCorazonVisual(boton, indiceFavorito !== -1);

        // Evento click para agregar/quitar favorito
        boton.addEventListener('click', (event) => {
                event.stopPropagation(); //que no se propague el <a>
                event.preventDefault(); //que no se ejecute el href del <a> (ni recargue la pagina)

            let usuarioLogueadoAuxJSON = sessionStorage.getItem('usuarioLogueado');
            let usuarioLogueadoAux = usuarioLogueadoAuxJSON ? JSON.parse(usuarioLogueadoAuxJSON) : { favoritos: [] };
            if (!usuarioLogueadoAux.favoritos) usuarioLogueadoAux.favoritos = [];
            let usuariosJSON = localStorage.getItem('usuarios');
            let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
            const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueadoAux.nombreUsuario);

            const indiceFavoritoAux = usuarioLogueadoAux.favoritos.findIndex(item => item.titulo === nombrePeliSerie);

            if (indiceFavoritoAux === -1) {
                // Buscar el objeto en el array de pelis/series
                const elementoSeleccionado = arrayPeliculasYseries.find(item => item.titulo === nombrePeliSerie);
                if (elementoSeleccionado) {
                    usuarioLogueadoAux.favoritos.push(elementoSeleccionado);
                    sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueadoAux));
                    if (usuarioIndex !== -1) {
                        usuarios[usuarioIndex] = usuarioLogueadoAux;
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    }
                    actualizarCorazonVisual(boton, true);
                }
            } else {
                usuarioLogueadoAux.favoritos.splice(indiceFavoritoAux, 1);
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueadoAux));
                if (usuarioIndex !== -1) {
                    usuarios[usuarioIndex] = usuarioLogueadoAux;
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                }
                actualizarCorazonVisual(boton, false);
            }
        });
    });
});
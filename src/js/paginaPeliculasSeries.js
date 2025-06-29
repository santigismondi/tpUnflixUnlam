document.addEventListener('DOMContentLoaded', () => {
    const botonCorazonFav = document.querySelectorAll('.fa-heart');

    botonCorazonFav.forEach(boton => {
        const nombrePeliSerie = boton.getAttribute('data-titulo-item');
        usuarioLogueadoInicialJSON = sessionStorage.getItem('usuarioLogueado');           
        let usuarioLogueadoInicial = JSON.parse(usuarioLogueadoInicialJSON);
        if (!usuarioLogueadoInicial.favoritos) {
            usuarioLogueadoInicial.favoritos = [];
        }
        const indiceFavoritoInicial = usuarioLogueadoInicial.favoritos.findIndex(item => item.titulo === nombrePeliSerie);

        if (indiceFavoritoInicial !== -1) {
            actualizarCorazonVisual(boton, true);
        } else {
            actualizarCorazonVisual(boton, false);
        }

        /**
         * SGI- Funcion agregar a favoritos
         */
        boton.addEventListener('click', () => {
            const nombrePeliSerieClickeada = boton.getAttribute('data-titulo-item');
            let elementoSeleccionado = null;
            arrayPeliculasYseries.filter(item => {
                if (item.titulo === nombrePeliSerieClickeada) {
                    elementoSeleccionado = item;
                    console.log(`Encontrado: ${item.titulo}`);
                }
            }); 
            usuarioLogueadoAuxiliarJSON = sessionStorage.getItem('usuarioLogueado');           
            let usuarioLogueadoAuxiliar = JSON.parse(usuarioLogueadoAuxiliarJSON);
            if (!usuarioLogueadoAuxiliar.favoritos) {
                usuarioLogueadoAuxiliar.favoritos = [];
            }
            let usuariosJSON = localStorage.getItem('usuarios');
            let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
            const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueadoAuxiliar.nombreUsuario); 
            //const peliculaSerieIndex = usuarioLogueado.favoritos.indexOf(nombrePeliSerie);
            const indiceFavoritoAuxiliar = usuarioLogueadoAuxiliar.favoritos.findIndex(item => item.titulo === nombrePeliSerieClickeada);

            if (indiceFavoritoAuxiliar === -1) {
                usuarioLogueadoAuxiliar.favoritos.push(elementoSeleccionado);
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueadoAuxiliar));
                if (usuarioIndex !== -1) {
                    usuarios[usuarioIndex] = usuarioLogueadoAuxiliar;
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    actualizarCorazonVisual(boton, true);
                    console.log("Array 'usuarios' general actualizado en localStorage.");
                }
                console.log(elementoSeleccionado);
            } else {
                    usuarioLogueadoAuxiliar.favoritos.splice(indiceFavoritoAuxiliar, 1);
                    sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueadoAuxiliar));
                    if (usuarioIndex !== -1) {
                        usuarios[usuarioIndex] = usuarioLogueadoAuxiliar;
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));
                        console.log("Array 'usuarios' general actualizado en localStorage.");
                    }
                    actualizarCorazonVisual(boton, false);
                    console.log('Clase cambiada a fa-regular');
                }
            });
        });
});

function actualizarCorazonVisual(btnCorazon, isFavorite) {
    if (isFavorite) {
        btnCorazon.classList.remove('fa-regular');
        btnCorazon.classList.add('fa-solid');
    } else {
        btnCorazon.classList.remove('fa-solid');
        btnCorazon.classList.add('fa-regular');
    }
}
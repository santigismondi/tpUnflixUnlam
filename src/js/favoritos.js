usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');            
const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
const favoritosDelUsuario = usuarioLogueado.favoritos;
const listaDePeliculas = PELICULAS;
const listaDeSeries = SERIES;
const todoElContenido = [...listaDePeliculas, ...listaDeSeries];
/**
 *         <section class="boxContenido" data-tipo="">
            <p id="nombrePeliSerie" name="" class="parrafoNombrePeliSerie"></p>
            <a class="etiquetaVinculoGrilla" href="../html/detallePelicula.html?titulo=">
                <img src="" alt="" class="portada">
            </a>
        </section>
 */
document.addEventListener('DOMContentLoaded', () => {
    //SGI - Mostrar los favoritos del usuario en la grilla de favoritos
    const grillaFavoritosContainer = document.getElementById('contenedorGrillaFavoritos');
    const mensajeFavoritosContainer = document.getElementById('contenedorMensaje');
    if (favoritosDelUsuario.length === 0) {
        mensajeFavoritosContainer.innerHTML = '<p class="mensaje-favoritos">Aún no tienes ninguna película o serie en tu lista de favoritos. ¡Explora y añade algunas!</p>';
        return;
    }else{
        favoritosDelUsuario.forEach(elementoFavorito => {
            const itemCompleto = todoElContenido.find(item => item.titulo === elementoFavorito.titulo);
            if(itemCompleto.tipo === 'pelicula'){
                grillaFavoritosContainer.innerHTML += `
                    <section class="boxContenido" data-tipo="${itemCompleto.tipo}">
                        <i class="fa-solid fa-heart" data-titulo-item="${itemCompleto.titulo}"></i>
                        <p id="nombrePeliSerie" name="${itemCompleto.tipo}" class="parrafoNombrePeliSerie">${itemCompleto.titulo}</p>
                        <a class="etiquetaVinculoGrilla" href="../html/detallePelicula.html?titulo=${encodeURIComponent(itemCompleto.titulo)}">
                            <img src="${itemCompleto.portada}" alt="${itemCompleto.titulo}" class="portada">
                        </a>
                    </section>`;
            }else if(itemCompleto.tipo === 'serie'){
                grillaFavoritosContainer.innerHTML += `
                    <section class="boxContenido" data-tipo="${itemCompleto.tipo}">
                        <i class="fa-solid fa-heart" data-titulo-item="${itemCompleto.titulo}"></i>
                        <p id="nombrePeliSerie" name="${itemCompleto.tipo}" class="parrafoNombrePeliSerie">${itemCompleto.titulo}</p>
                        <a class="etiquetaVinculoGrilla" href="../html/detalleSerie.html?titulo=${encodeURIComponent(itemCompleto.titulo)}">
                            <img src="${itemCompleto.portada}" alt="${itemCompleto.titulo}" class="portada">
                        </a>
                    </section>`;
            }
        });
    }
        //SGI - Funcion para actualizar el corazón de favoritos
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
            todoElContenido.filter(item => {
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
            // Refrescar la página para mostrar los cambios
            location.reload();
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
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
        favoritosDelUsuario.forEach(tituloFavorito => {
            const itemCompleto = todoElContenido.find(item => item.titulo === tituloFavorito);
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
        usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');            
        const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
        let usuariosJSON = localStorage.getItem('usuarios');
        let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
        if (!usuarioLogueado.favoritos) {
            usuarioLogueado.favoritos = [];
        }
        const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueado.nombreUsuario); 
        const peliculaSerieIndex = usuarioLogueado.favoritos.indexOf(nombrePeliSerie);

        if (usuarioLogueado.favoritos[peliculaSerieIndex] === nombrePeliSerie) {
            actualizarCorazonVisual(boton, true);
        } else {
            actualizarCorazonVisual(boton, false);
        }
    botonCorazonFav.forEach(boton => {
        const nombrePeliSerie = boton.getAttribute('data-titulo-item');
        usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');            
        const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
        let usuariosJSON = localStorage.getItem('usuarios');
        let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
        if (!usuarioLogueado.favoritos) {
            usuarioLogueado.favoritos = [];
        }
        const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueado.nombreUsuario); 
        const peliculaSerieIndex = usuarioLogueado.favoritos.indexOf(nombrePeliSerie);

        if (usuarioLogueado.favoritos[peliculaSerieIndex] === nombrePeliSerie) {
            actualizarCorazonVisual(boton, true);
        } else {
            actualizarCorazonVisual(boton, false);
        }
        boton.addEventListener('click', () => {                
            if (usuarioLogueado.favoritos[peliculaSerieIndex] != nombrePeliSerie) {
                usuarioLogueado.favoritos.push(nombrePeliSerie);
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
                if (usuarioIndex !== -1) {
                    usuarios[usuarioIndex] = usuarioLogueado; 
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    actualizarCorazonVisual(boton, true);
                    console.log("Array 'usuarios' general actualizado en localStorage.");
                }
                console.log(nombrePeliSerie);
            } else if(usuarioLogueado.favoritos[peliculaSerieIndex] === nombrePeliSerie){
                usuarioLogueado.favoritos.splice(peliculaSerieIndex, 1);
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
                if (usuarioIndex !== -1) {
                    usuarios[usuarioIndex] = usuarioLogueado; 
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    console.log("Array 'usuarios' general actualizado en localStorage.");
                }
                actualizarCorazonVisual(boton, false);
                console.log('Clase cambiada a fa-regular');
            }
        });
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
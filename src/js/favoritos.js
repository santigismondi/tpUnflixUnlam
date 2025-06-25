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
    const grillaFavoritosContainer = document.getElementById('contenedorGrillaFavoritos');
    if (favoritosDelUsuario.length === 0) {
        grillaFavoritosContainer.innerHTML = '<p class="mensaje-favoritos">Aún no tienes ninguna película o serie en tu lista de favoritos. ¡Explora y añade algunas!</p>';
        return;
    }else{
        favoritosDelUsuario.forEach(tituloFavorito => {
            const itemCompleto = todoElContenido.find(item => item.titulo === tituloFavorito);
            if(itemCompleto.tipo === 'pelicula'){
                grillaFavoritosContainer.innerHTML += `
                    <section class="boxContenido" data-tipo="${itemCompleto.tipo}">
                    <i class="fa-solid fa-heart corazon-favorito" data-titulo-item="${itemCompleto.titulo}"></i>
                    <p id="nombrePeliSerie" name="${itemCompleto.tipo}" class="parrafoNombrePeliSerie">${itemCompleto.titulo}</p>
                    <a class="etiquetaVinculoGrilla" href="../html/detallePelicula.html?titulo=${encodeURIComponent(itemCompleto.titulo)}">
                        <img src="${itemCompleto.portada}" alt="${itemCompleto.titulo}" class="portada">
                    </a>`
            }else if(itemCompleto.tipo === 'serie'){
                grillaFavoritosContainer.innerHTML += `
                    <section class="boxContenido" data-tipo="${itemCompleto.tipo}">
                    <i class="fa-solid fa-heart corazon-favorito" data-titulo-item="${itemCompleto.titulo}"></i>
                    <p id="nombrePeliSerie" name="${itemCompleto.tipo}" class="parrafoNombrePeliSerie">${itemCompleto.titulo}</p>
                    <a class="etiquetaVinculoGrilla" href="../html/detalleSerie.html?titulo=${encodeURIComponent(itemCompleto.titulo)}">
                        <img src="${itemCompleto.portada}" alt="${itemCompleto.titulo}" class="portada">
                    </a>`
            }
        });

    }
});
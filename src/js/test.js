// Asegúrate de que PELICULAS y SERIES estén definidos GLOBALMENTE
// o pasados a donde este código se ejecuta. Por ejemplo:
/*
const PELICULAS = [
    { titulo: "Capitan America: Civil War", tipo: "pelicula", portada: "../recursos/imagenes/civilwar.jpg" },
    { titulo: "Avengers: Endgame", tipo: "pelicula", portada: "../recursos/imagenes/endgame.jpg" }
    // ... más películas
];
const SERIES = [
    { titulo: "Loki", tipo: "serie", portada: "../recursos/imagenes/loki.jpg" },
    { titulo: "Stranger Things", tipo: "serie", portada: "../recursos/imagenes/stranger_things.jpg" }
    // ... más series
];
*/

// Esto debe estar fuera del DOMContentLoaded si necesitas que sean accesibles globalmente
// o definidos dentro de la función si solo se usan ahí.
usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');            
const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
// Asegurarse de que favoritos exista y sea un array
const favoritosDelUsuario = (usuarioLogueado && usuarioLogueado.favoritos) ? usuarioLogueado.favoritos : [];

const listaDePeliculas = typeof PELICULAS !== 'undefined' ? PELICULAS : [];
const listaDeSeries = typeof SERIES !== 'undefined' ? SERIES : [];
const todoElContenido = [...listaDePeliculas, ...listaDeSeries];

document.addEventListener('DOMContentLoaded', () => {
    const grillaFavoritosContainer = document.getElementById('contenedorGrillaFavoritos');

    if (!grillaFavoritosContainer) {
        console.error("El elemento con ID 'contenedorGrillaFavoritos' no fue encontrado en el DOM.");
        return; // Salir si el contenedor no existe
    }

    // Si no hay favoritos, mostrar un mensaje y salir
    if (favoritosDelUsuario.length === 0) {
        grillaFavoritosContainer.innerHTML = '<p class="mensaje-favoritos">Aún no tienes ninguna película o serie en tu lista de favoritos. ¡Explora y añade algunas!</p>';
        return;
    }

    // LIMPIAR el contenedor antes de añadir los nuevos elementos
    grillaFavoritosContainer.innerHTML = ''; 

    // Itera sobre la lista de favoritos del USUARIO
    favoritosDelUsuario.forEach(tituloFavorito => {
        // Busca los detalles completos de este favorito en la lista de TODO el contenido
        const itemCompleto = todoElContenido.find(item => item.titulo === tituloFavorito);

        if (itemCompleto) {
            // Si el contenido se encuentra, construye el elemento HTML
            const tituloCodificado = encodeURIComponent(itemCompleto.titulo);
            // Decide si es detallePelicula o detalleSerie, asumiendo un atributo 'tipo' en tus objetos de contenido
            const paginaDetalle = (itemCompleto.tipo === 'pelicula') ? '../html/detallePelicula.html' : '../html/detalleSerie.html';
            const urlDetalle = `${paginaDetalle}?titulo=${tituloCodificado}`;

            // Crear el elemento <section class="boxContenido">
            const boxContenido = document.createElement('section');
            boxContenido.classList.add('boxContenido');
            boxContenido.setAttribute('data-tipo', itemCompleto.tipo);

            // Crear y añadir el corazón (en favoritos, siempre 'fa-solid')
            const heartIcon = document.createElement('i');
            heartIcon.classList.add('fa-solid', 'fa-heart', 'corazon-favorito'); // Añade 'corazon-favorito' para poder seleccionarlo
            heartIcon.setAttribute('data-titulo-item', itemCompleto.titulo); // Crucial para la función toggleFavorito
            boxContenido.appendChild(heartIcon);

            // Crear y añadir el párrafo con el nombre
            const parrafoNombre = document.createElement('p');
            parrafoNombre.classList.add('parrafoNombrePeliSerie');
            parrafoNombre.setAttribute('name', itemCompleto.tipo); // Usa 'name' para el tipo
            parrafoNombre.textContent = itemCompleto.titulo;
            boxContenido.appendChild(parrafoNombre);

            // Crear y añadir el enlace y la imagen de portada
            const linkPortada = document.createElement('a');
            linkPortada.classList.add('etiquetaVinculoGrilla');
            linkPortada.href = urlDetalle;

            const imgPortada = document.createElement('img');
            imgPortada.src = itemCompleto.portada || '../recursos/imagenes/placeholder.webp'; // Usa una imagen de placeholder si no hay portada
            imgPortada.alt = itemCompleto.titulo;
            imgPortada.classList.add('portada');
            linkPortada.appendChild(imgPortada);
            boxContenido.appendChild(linkPortada);

            // Añadir el 'boxContenido' completo a la grilla de favoritos
            grillaFavoritosContainer.appendChild(boxContenido);

        } else {
            console.warn(`No se encontraron detalles para el favorito "${tituloFavorito}". Puede que el JSON de contenido esté incompleto o el título no coincida.`);
        }
    });

    // Opcional: Si quieres que los corazones sean interactivos en esta página (para quitar de favoritos)
    // Asegúrate de que la función 'toggleFavorito' esté definida y accesible globalmente
    // o pásala como argumento si es necesario.
    if (typeof toggleFavorito === 'function') {
        const corazonesEnFavoritos = grillaFavoritosContainer.querySelectorAll('.corazon-favorito');
        corazonesEnFavoritos.forEach(heart => {
            heart.addEventListener('click', (event) => {
                event.stopPropagation();
                const titulo = event.currentTarget.getAttribute('data-titulo-item');
                toggleFavorito(titulo);
                // Opcional: Re-generar la grilla después de eliminar para que el elemento desaparezca
                // location.reload(); // Recarga toda la página (simple pero no ideal)
                // O si tienes una función para regenerar:
                // generarGrillaFavoritos(favoritosDelUsuario, todosLosContenidos, grillaFavoritosContainer);
                // Nota: Para una eliminación fluida, idealmente deberías remover solo el 'boxContenido' del DOM.
                // Esto es más complejo, pero puedes empezar con un reload o regenerar todo.
                const usuarioActualizado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
                if (usuarioActualizado && usuarioActualizado.favoritos && !usuarioActualizado.favoritos.includes(titulo)) {
                    event.currentTarget.closest('.boxContenido').remove(); // Remover el box si el favorito ya no está
                    if (usuarioActualizado.favoritos.length === 0) {
                        grillaFavoritosContainer.innerHTML = '<p class="mensaje-favoritos">Aún no tienes ninguna película o serie en tu lista de favoritos. ¡Explora y añade algunas!</p>';
                    }
                }
            });
        });
    } else {
        console.warn("La función 'toggleFavorito' no está definida. Los corazones en la grilla de favoritos no serán interactivos.");
    }
});
// Función para cargar el contenido (películas y series) desde el archivo JSON
async function cargarContenido() {
    try {
        // Ajusta la ruta a tu archivo contenido.json
        const response = await fetch('./data/contenido.json');
        if (!response.ok) {
            throw new Error(`Error HTTP al cargar contenido: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar el contenido JSON:", error);
        return null;
    }
}

// Función para generar la grilla dinámicamente
async function generarGrillaContenido() {
    const grillaContainer = document.querySelector('.grillaInicio');
    if (!grillaContainer) {
        console.error("No se encontró el contenedor .grillaInicio en el DOM.");
        return;
    }

    // Cargar todo el contenido
    const todoElContenido = await cargarContenido();

    if (!todoElContenido) {
        // Si no hay contenido, no hacemos nada
        return;
    }

    // Limpiar cualquier contenido existente en la grilla (si lo hubiera)
    grillaContainer.innerHTML = '';

    todoElContenido.forEach(item => {
        // Codificar el título para que sea seguro en una URL
        const tituloCodificado = encodeURIComponent(item.titulo);

        // Determinar la página de detalle según el tipo (pelicula o serie)
        const paginaDetalle = (item.tipo === 'pelicula') ? '../html/detallePelicula.html' : '../html/detalleSerie.html';

        // Crear la URL completa con el parámetro de título
        const urlDetalle = `${paginaDetalle}?titulo=${tituloCodificado}`;

        // Crear los elementos HTML dinámicamente
        const boxContenido = document.createElement('section');
        boxContenido.classList.add('boxContenido');
        // Opcional: añadir data-tipo si lo usas para filtros, como habíamos hablado
        boxContenido.setAttribute('data-tipo', item.tipo);

        const parrafoNombre = document.createElement('p');
        // No necesitas id="nombrePeliSerie" para todos, ya que el id debe ser único
        // Puedes usar la clase si necesitas seleccionarlos todos
        parrafoNombre.classList.add('parrafoNombrePeliSerie');
        parrafoNombre.setAttribute('name', item.tipo); // Usa el tipo para el atributo name
        parrafoNombre.textContent = item.titulo;

        const linkPortada = document.createElement('a');
        linkPortada.classList.add('etiquetaVinculoGrilla');
        linkPortada.href = urlDetalle; // ¡Aquí asignamos la URL dinámica!

        const imgPortada = document.createElement('img');
        // Asegúrate de que tu JSON tenga un campo 'imagenPortada' con la ruta
        // Por ejemplo: item.imagenPortada = "../recursos/imagenes/portadasPeliculas/civilWar.webp"
        // Si no lo tienes en el JSON, tendrías que inferirlo o añadirlo.
        // Por ahora, asumiré que el JSON tiene 'imagenPortada'.
        imgPortada.src = item.imagenPortada || '../recursos/imagenes/placeholder.webp'; // Usa una imagen de respaldo si no hay
        imgPortada.alt = item.titulo;
        imgPortada.classList.add('portada');

        // Construir la estructura
        linkPortada.appendChild(imgPortada);
        boxContenido.appendChild(parrafoNombre);
        boxContenido.appendChild(linkPortada);

        grillaContainer.appendChild(boxContenido);
    });
}

// Llama a la función para generar la grilla cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', generarGrillaContenido);
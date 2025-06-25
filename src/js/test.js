document.addEventListener('DOMContentLoaded', () => {
    // ... (Tu código de recopilarContenido, selectCategorias, inputBuscador, aplicarFiltros, etc.) ...
    
    // Asegúrate de que 'actualizarCorazonVisual' esté definida
    function actualizarCorazonVisual(heartElement, isFavorite) {
        if (isFavorite) {
            heartElement.classList.remove('fa-regular');
            heartElement.classList.add('fa-solid');
        } else {
            heartElement.classList.remove('fa-solid');
            heartElement.classList.add('fa-regular');
        }
    }

    const botonCorazonFav = document.querySelectorAll('.fa-heart');

    // --- 1. Inicializar el estado de los corazones al cargar la página ---
    // Esta parte se ejecuta UNA VEZ al cargar la página.
    // Solo actualiza la apariencia visual inicial.
    let usuarioLogueadoInicial = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueadoInicial || !usuarioLogueadoInicial.favoritos) {
        usuarioLogueadoInicial = { favoritos: [] };
    }

    botonCorazonFav.forEach(boton => {
        const nombrePeliSerie = boton.getAttribute('data-titulo-item');
        
        // Verifica si la película/serie ya está en favoritos al cargar
        if (usuarioLogueadoInicial.favoritos.includes(nombrePeliSerie)) {
            actualizarCorazonVisual(boton, true); // Corazón relleno
        } else {
            actualizarCorazonVisual(boton, false); // Corazón vacío
        }

        // --- 2. Añadir el Event Listener para el clic ---
        // Este código se ejecuta CADA VEZ que se hace clic en un botón.
        boton.addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que el clic se propague

            const clickedButton = event.currentTarget; // El corazón específico clickeado
            const clickedItemName = clickedButton.getAttribute('data-titulo-item');

            // --- ¡IMPORTANTE! Recargar el estado del usuario cada vez que se hace clic ---
            let usuarioLogueadoActual = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
            if (!usuarioLogueadoActual) {
                alert("Necesitas iniciar sesión para añadir favoritos.");
                return; // Salir si no hay usuario logueado
            }
            if (!usuarioLogueadoActual.favoritos) {
                usuarioLogueadoActual.favoritos = [];
            }

            // Buscar el índice de la película/serie en la lista ACTUAL de favoritos
            const currentPeliculaSerieIndex = usuarioLogueadoActual.favoritos.indexOf(clickedItemName);

            // Lógica de alternar (toggle)
            if (currentPeliculaSerieIndex === -1) {
                // Si NO está en favoritos, agregarlo
                usuarioLogueadoActual.favoritos.push(clickedItemName);
                actualizarCorazonVisual(clickedButton, true); // Rellenar corazón
                console.log(`"${clickedItemName}" añadido a favoritos.`);
            } else {
                // Si SÍ está en favoritos, quitarlo
                usuarioLogueadoActual.favoritos.splice(currentPeliculaSerieIndex, 1);
                actualizarCorazonVisual(clickedButton, false); // Vaciar corazón
                console.log(`"${clickedItemName}" eliminado de favoritos.`);
            }

            // --- Guardar los cambios actualizados en sessionStorage ---
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueadoActual));

            // --- Actualizar el array 'usuarios' en localStorage (persistencia) ---
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            // Asumo que 'email' es el identificador único del usuario
            const usuarioIndex = usuarios.findIndex(u => u.email === usuarioLogueadoActual.email);
            
            if (usuarioIndex !== -1) {
                usuarios[usuarioIndex] = usuarioLogueadoActual; 
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                console.log("Array 'usuarios' general actualizado en localStorage.");
            } else {
                console.warn("Usuario logueado no encontrado en el array 'usuarios' global. No se pudo guardar la preferencia de favorito persistentemente.");
            }
        });
    });

    // Asegúrate de que 'aplicarFiltros()' se llama aquí si es necesario al inicio
    aplicarFiltros(); 
});
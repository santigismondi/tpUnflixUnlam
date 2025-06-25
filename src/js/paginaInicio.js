function recopilarContenido() {
    const peliculas = [];
    const series = [];
    const todoElContenido = [];

    const elementosP = document.querySelectorAll('.parrafoNombrePeliSerie');

    elementosP.forEach(parrafo => {
        const nombre = parrafo.textContent.trim();
        const tipo = parrafo.getAttribute('name'); 

        if (nombre) {
            todoElContenido.push(nombre);

            if (tipo === 'pelicula') {
                peliculas.push(nombre);
            } else if (tipo === 'serie') {
                series.push(nombre);
            }
        }
    });

    return {
        peliculas: peliculas,
        series: series,
        todoElContenido: todoElContenido
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const contenidoRecopilado = recopilarContenido();    
    window.listaPeliculas = contenidoRecopilado.peliculas;
    window.listaSeries = contenidoRecopilado.series;
    window.listaTodoElContenido = contenidoRecopilado.todoElContenido;
});

document.addEventListener('DOMContentLoaded', () => {
    const selectCategorias = document.getElementById('listaCategorias');
    const inputBuscador = document.getElementById('buscador');
    //const grillaInicio = document.querySelector('.grillaInicio'); 
    const boxContenidos = document.querySelectorAll('.boxContenido'); 
    const botonCorazonFav = document.querySelectorAll('.fa-heart');
    
    function aplicarFiltros() {
        const categoriaSeleccionada = selectCategorias.options[selectCategorias.selectedIndex].text.toLowerCase(); 
        const textoBusqueda = inputBuscador.value.toLowerCase().trim();

        boxContenidos.forEach(box => {
            const nombrePeliSerieElement = box.querySelector('.parrafoNombrePeliSerie');
            const nombre = nombrePeliSerieElement ? nombrePeliSerieElement.textContent.toLowerCase() : '';
            const tipoContenido = box.getAttribute('data-tipo');

            let mostrarPorCategoria = true;
            let mostrarPorBusqueda = true;

            if (categoriaSeleccionada === 'peliculas' && tipoContenido !== 'pelicula') {
                mostrarPorCategoria = false;
            } else if (categoriaSeleccionada === 'series' && tipoContenido !== 'serie') {
                mostrarPorCategoria = false;
            }

            if (textoBusqueda && !nombre.includes(textoBusqueda)) {
                mostrarPorBusqueda = false;
            }

            if (mostrarPorCategoria && mostrarPorBusqueda) {
                box.style.display = 'flex';
            } else {
                box.style.display = 'none';
            }
        });
    }

    selectCategorias.addEventListener('change', aplicarFiltros);

    inputBuscador.addEventListener('keyup', aplicarFiltros);

    aplicarFiltros();

    botonCorazonFav.forEach(boton => {
        const nombrePeliSerie = boton.getAttribute('data-titulo-item');
        usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');            
        let usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
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

function actualizarCorazonVisual(btnCorazon, isFavorite) {
    if (isFavorite) {
        btnCorazon.classList.remove('fa-regular');
        btnCorazon.classList.add('fa-solid');
    } else {
        btnCorazon.classList.remove('fa-solid');
        btnCorazon.classList.add('fa-regular');
    }
}
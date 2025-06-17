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
    const grillaInicio = document.querySelector('.grillaInicio'); 
    const boxContenidos = document.querySelectorAll('.boxContenido'); 

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
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    }

    selectCategorias.addEventListener('change', aplicarFiltros);

    inputBuscador.addEventListener('keyup', aplicarFiltros);

    aplicarFiltros();
});
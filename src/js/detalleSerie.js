let series = [];
const seriesJSON = localStorage.getItem("series");
if (!seriesJSON) {
    localStorage.setItem("series", JSON.stringify(SERIES));
    series = SERIES;
} else {
    series = JSON.parse(seriesJSON)
}
//const longitudVectorDatosPeliculas = peliculas.length;

console.log(JSON.stringify(series));

const url = new URL(window.location.href);
const tituloSerie = url.searchParams.get("titulo");

document.getElementById("titulo-serie").textContent = tituloSerie;
const serie = series.find(s => s.titulo === tituloSerie);


class detalleSerie {
    generarVista(serie) {
        document.getElementById("genero-serie").textContent = serie.genero;
        document.getElementById("actores-serie").textContent = serie.actores.join(", ");
        document.getElementById("descripcion-serie").textContent = serie.descripcion;
        document.querySelector(".infoContent").innerHTML = serie.iframe;
    }
}

if (serie) {
    const vista = new detalleSerie();
    vista.generarVista(serie);

    const temporadasSelect = document.getElementById("temporadas");
    const capitulosSelect = document.getElementById("capitulos");

    // Verificamos si el campo episodios existe y es un array
    if (Array.isArray(serie.episodios)) {
        // Llenar select de temporadas
        serie.episodios.forEach((_, index) => {
            const option = document.createElement("option");
            option.value = index; // Índice de la temporada
            option.textContent = `Temporada ${index + 1}`;
            temporadasSelect.appendChild(option);
        });

        // Función que actualiza los capítulos según temporada
        function actualizarCapitulos() {
            const temporadaSeleccionada = parseInt(temporadasSelect.value);
            const cantidadCapitulos = serie.episodios[temporadaSeleccionada];

            capitulosSelect.innerHTML = ""; // limpiar

            for (let i = 1; i <= cantidadCapitulos; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = `Capítulo ${i}`;
                capitulosSelect.appendChild(option);
            }
        }

        // Escuchar el cambio de temporada
        temporadasSelect.addEventListener("change", actualizarCapitulos);

        // Inicializar con primera temporada
        actualizarCapitulos();
    } else {
        console.warn("La serie no contiene el campo 'episodios' como array.");
    }

} else {
    console.warn("Serie no encontrada");
}

//Agrega nombres de actores con su link de biografia
const actoresContainer = document.getElementById("actores-serie");
actoresContainer.innerHTML = ""; // Limpiar

serie.actores.forEach((actor, index) => {
  const link = document.createElement("a");
  link.href = actor.wiki;
  link.textContent = actor.nombre;
  link.target = "_blank";

  actoresContainer.appendChild(link);

  // Agregar coma si no es el último
  if (index < serie.actores.length - 1) {
    actoresContainer.appendChild(document.createTextNode(", "));
  }
});

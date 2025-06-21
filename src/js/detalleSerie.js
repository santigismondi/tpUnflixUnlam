let series = [];
const seriesJSON = localStorage.getItem("series");
if(!seriesJSON){
    localStorage.setItem("series", JSON.stringify(SERIES));
    series = SERIES;
}else{
    series = JSON.parse(seriesJSON)
}
//const longitudVectorDatosPeliculas = peliculas.length;

console.log(JSON.stringify(series));

const url = new URL(window.location.href);
const tituloSerie = url.searchParams.get("titulo");

document.getElementById("titulo-serie").textContent = tituloSerie;
const serie = series.find(s => s.titulo === tituloSerie);


class detalleSerie{
    generarVista(serie){
            //document.getElementById("duracion-pelicula").textContent = pelicula.duracion;
            document.getElementById("genero-serie").textContent = serie.genero;
            document.getElementById("actores-serie").textContent = serie.actores;
            document.getElementById("descripcion-serie").textContent = serie.descripcion;
            document.querySelector(".infoContent").innerHTML = serie.iframe;        
    }
}

if (serie) {
    const vista = new detalleSerie();
    vista.generarVista(serie);
} else {
    console.warn("Serie no encontrada");
}
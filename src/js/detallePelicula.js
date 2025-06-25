let peliculas = [];
const peliculasJSON = localStorage.getItem("peliculas");
if(!peliculasJSON){
    localStorage.setItem("peliculas", JSON.stringify(PELICULAS));
    peliculas = PELICULAS;
}else{
    peliculas = JSON.parse(peliculasJSON)
}
const longitudVectorDatosPeliculas = peliculas.length;

console.log(JSON.stringify(peliculas));

const url = new URL(window.location.href);
const tituloPelicula = url.searchParams.get("titulo");

document.getElementById("titulo-pelicula").textContent = tituloPelicula;
const pelicula = peliculas.find(p => p.titulo === tituloPelicula);

//console.log(pelicula);

class detallePelicula{
    generarVista(pelicula){
            document.getElementById("duracion-pelicula").textContent = pelicula.duracion;
            document.getElementById("genero-pelicula").textContent = pelicula.genero;
            document.getElementById("actores-pelicula").textContent = pelicula.actores;
            document.getElementById("descripcion-pelicula").textContent = pelicula.descripcion;
            document.querySelector(".infoContent").innerHTML = pelicula.iframe;        
    }
}

if (pelicula) {
    const vista = new detallePelicula();
    vista.generarVista(pelicula);
} else {
    console.warn("Película no encontrada");
}

//Agrega nombres de actores con su link de biografia
const actoresContainer = document.getElementById("actores-pelicula");
actoresContainer.innerHTML = ""; // Limpiar

pelicula.actores.forEach((actor, index) => {
  const link = document.createElement("a");
  link.href = actor.wiki;
  link.textContent = actor.nombre;
  link.target = "_blank";

  actoresContainer.appendChild(link);

  // Agregar coma si no es el último
  if (index < pelicula.actores.length - 1) {
    actoresContainer.appendChild(document.createTextNode(", "));
  }
});

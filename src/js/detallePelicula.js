let peliculas = [];
const peliculasJSON = localStorage.getItem("peliculas");
if(!peliculasJSON){
    localStorage.setItem("peliculas", JSON.stringify(PELICULAS));
    peliculas = PELICULAS;
}else{
    peliculas = JSON.parse(peliculasJSON)
}

console.log(JSON.stringify(peliculas));
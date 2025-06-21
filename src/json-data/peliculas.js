const PELICULAS = [
  {
    "tipo": "pelicula",
    "titulo": "El Ultimo Gran Heroe",
    "duracion": "2h 10m",
    "genero": "Acción, Aventura, Fantasía",
    "actores": ["Arnold Schwarzenegger", "Charles Dance", "Austin O'Brien"],
    "descripcion": "Un joven aficionado al cine es mágicamente transportado a una película de acción, donde se une a su héroe en una emocionante aventura.",
    "iframe": `<iframe width="560" height="315" src="https://www.youtube.com/embed/ShBw43KJoLk" 
                title="Last Action Hero Trailer" frameborder="0" allowfullscreen></iframe>
                <a href="https://www.youtube.com/watch?v=ShBw43KJoLk" target="_blank">
                <input type="button" value="Comenzar" class="infoButton">
                </a>`  
},
  {
    "tipo": "pelicula",
    "titulo": "Buzz Lightyear",
    "duracion": "1h 45m",
    "genero": "Animación, Aventura, Ciencia Ficción",
    "actores": ["Chris Evans", "Keke Palmer", "Taika Waititi"],
    "descripcion": "La historia de origen de Buzz Lightyear, el héroe que inspiró el juguete, y sus aventuras en el espacio.",
    "iframe": `<iframe width="560" height="315" src="https://www.youtube.com/embed/BwZs3H_UN3k" 
                title="Lightyear Trailer" frameborder="0" allowfullscreen></iframe>
                <a href="https://www.youtube.com/watch?v=BwZs3H_UN3k" target="_blank">
                <input type="button" value="Comenzar" class="infoButton">
                </a>`
},
  {
    "tipo": "pelicula",
    "titulo": "Capitan America: Y el Soldado de Invierno",
    "duracion": "2h 16m",
    "genero": "Acción, Ciencia Ficción, Thriller",
    "actores": ["Chris Evans", "Scarlett Johansson", "Sebastian Stan"],
    "descripcion": "Steve Rogers se une a Black Widow para descubrir una conspiración oscura, enfrentándose a un nuevo y formidable enemigo: el Soldado de Invierno.",
    "iframe": `<iframe width="560" height="315" src="https://www.youtube.com/embed/Zk1ELX5r5s0" 
                title="Winter Soldier Trailer" frameborder="0" allowfullscreen></iframe>
                <a href="https://www.youtube.com/watch?v=Zk1ELX5r5s0" target="_blank">
                <input type="button" value="Comenzar" class="infoButton">
                </a>`
},
  {
    "tipo": "pelicula",
    "titulo": "Capitan America: El Primer Vengador",
    "duracion": "2h 4m",
    "genero": "Acción, Aventura, Ciencia Ficción",
    "actores": ["Chris Evans", "Hayley Atwell", "Sebastian Stan"],
    "descripcion": "Durante la Segunda Guerra Mundial, un joven débil se transforma en el Capitán América para luchar contra los nazis.",
    "iframe": `<iframe width="560" height="315" src="https://www.youtube.com/embed/JerVrbLldXw" 
                title="First Avenger Trailer" frameborder="0" allowfullscreen></iframe>
                <a href="https://www.youtube.com/watch?v=JerVrbLldXw" target="_blank">
                <input type="button" value="Comenzar" class="infoButton">
                </a>`  
},
  {
    "tipo": "pelicula",
    "titulo": "Cars",
    "duracion": "1h 57m",
    "genero": "Animación, Aventura, Comedia",
    "actores": ["Owen Wilson", "Paul Newman", "Bonnie Hunt"],
    "descripcion": "Un coche de carreras novato aprende lecciones de vida en un pequeño pueblo olvidado mientras busca su camino hacia la victoria.",
    "iframe": `<iframe width="560" height="315" src="https://www.youtube.com/embed/SRXgG5B8fpg" 
                title="Cars Trailer" frameborder="0" allowfullscreen></iframe>
                <a href="https://www.youtube.com/watch?v=SRXgG5B8fpg" target="_blank">
                    <input type="button" value="Comenzar" class="infoButton">
                </a>`
},
  {
    "tipo": "pelicula",
    "titulo": "Capitan America: Civil War",
    "duracion": "2h 27m",
    "genero": "Acción, Ciencia Ficción, Superhéroes",
    "actores": ["Chris Evans", "Robert Downey Jr.", "Scarlett Johansson"],
    "descripcion": "Los Vengadores se dividen en dos facciones, lideradas por el Capitán América y Iron Man, después de que la política interfiere en sus operaciones.",
    "iframe": `<iframe width="560" height="315" src="https://www.youtube.com/embed/dKrVegVI0Us?si=KF1mMDdkvg02pwHJ" 
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <a href="https://www.youtube.com/watch?v=dKrVegVI0Us&ab_channel=MarvelEntertainment" target="_blank">
                <input type="button" value="Comenzar" class="infoButton">
                </a>`
},
  {
    "tipo": "pelicula",
    "titulo": "Monsters Inc.",
    "duracion": "1h 32m",
    "genero": "Animación, Aventura, Comedia",
    "actores": ["John Goodman", "Billy Crystal", "Mary Gibbs"],
    "descripcion": "Los monstruos Sulley y Mike trabajan asustando niños para generar energía, hasta que una pequeña niña irrumpe en su mundo.",
    "iframe": `<iframe width="560" height="315" src="https://www.youtube.com/embed/uzkkh-1A_kY?si=dsNBjN4p-0BOuFkk" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <a href="https://www.youtube.com/watch?v=uzkkh-1A_kY&ab_channel=XDP1026DX" target="_blank">
        <input type="button" value="Comenzar" class="infoButton">
        </a>`
},
  {
    "tipo": "pelicula",
    "titulo": "La Gran Final",
    "duracion": "1h 30m",
    "genero": "Documental, Deporte",
    "actores": ["Lionel Messi", "Diego Maradona", "Periodistas deportivos (imaginarios)"],
    "descripcion": "Un documental que explora los momentos clave y la emoción que rodeó la final de la Copa Mundial 2022 para Argentina.",
    "iframe": `<iframe width="560" height="315" src="https://www.youtube.com/watch?v=bERxUcV5UbA" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <a href="https://www.youtube.com/watch?v=bERxUcV5UbA" target="_blank">
        <input type="button" value="Comenzar" class="infoButton">
        </a>`  
}
]

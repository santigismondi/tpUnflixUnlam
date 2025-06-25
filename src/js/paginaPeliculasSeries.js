document.addEventListener('DOMContentLoaded', () => {
    const botonCorazonFav = document.querySelectorAll('.fa-heart');

    botonCorazonFav.forEach(boton => {
        const nombrePeliSerie = boton.getAttribute('data-titulo-item');
        usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');            
        const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
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
        botonCorazonFav.forEach(boton => {
            const nombrePeliSerie = boton.getAttribute('data-titulo-item');
            usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');            
            const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
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
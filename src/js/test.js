document.addEventListener('DOMContentLoaded', () => {
    const selectVistas = document.getElementById('listaVistas');
    
    // Al cargar la página, llamamos a actualizarVista con la vista guardada del usuario.
    // Esto aplicará los estilos y también seleccionará la opción correcta en el <select>.
    actualizarVista(usuarioLogueado.vista);
        
    function actualizarVista(usuarioVistaSeleccionada) {    
        const contenedorFormularioPerfil = document.querySelector('.formularioPerfil');
        const contenedorPerfil = document.querySelector('.contenedorPerfil');
        
        // Obtiene la vista seleccionada actualmente en el dropdown (si aplica)
        const vistaSeleccionada = selectVistas.options[selectVistas.selectedIndex].text.toLowerCase();
        
        // Determina la vista final a aplicar: si usuarioVistaSeleccionada es 'truthy', la usa; de lo contrario, usa vistaSeleccionada.
        const vista = usuarioVistaSeleccionada || vistaSeleccionada;

        // --- ¡NUEVO CÓDIGO AQUÍ! ---
        // Itera sobre las opciones del select para encontrar la que coincide con la vista actual
        for (let i = 0; i < selectVistas.options.length; i++) {
            if (selectVistas.options[i].value.toLowerCase() === vista) {
                selectVistas.selectedIndex = i; // Establece la opción como seleccionada
                break; // Una vez encontrada, salimos del bucle
            }
        }
        // --- FIN DEL NUEVO CÓDIGO ---


        if (vista === 'columna') {
            contenedorPerfil.style.flexDirection = 'column';
            const nuevoLayout = `
                'datos'
                'metodoDePago'
                'botones'
            `;
            contenedorPerfil.style.alignItems = 'center'; // Esto alinea los elementos del contenedorPerfil
            contenedorFormularioPerfil.style.gridTemplateAreas = nuevoLayout;
            contenedorFormularioPerfil.style.marginTop = '40px';
            contenedorFormularioPerfil.style.width = '80%'; 
            contenedorFormularioPerfil.style.gridTemplateColumns = '1fr'; // Asegúrate de la columna para Grid
            

            usuarioLogueado.vista = 'columna';
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
            const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueado.nombreUsuario); 
            usuarios[usuarioIndex] = usuarioLogueado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

        } else if (vista === 'fila') {
            contenedorPerfil.style.flexDirection = 'row';
            const nuevoLayout = `
                'datos metodoDePago'
                'botones botones'
            `;
            contenedorPerfil.style.alignItems = 'flex-start'; // Puedes ajustar esto si necesitas otra alineación para fila
            contenedorFormularioPerfil.style.gridTemplateAreas = nuevoLayout;
            contenedorFormularioPerfil.style.marginTop = '0px'; // Restablecer margen si no lo necesitas en 'fila'
            contenedorFormularioPerfil.style.width = '100%'; // Restablecer ancho si no lo necesitas en 'fila'
            contenedorFormularioPerfil.style.gridTemplateColumns = '1fr 1fr'; // Asegúrate de las dos columnas para Grid
            
            usuarioLogueado.vista = 'fila';
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
            const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueado.nombreUsuario); 
            usuarios[usuarioIndex] = usuarioLogueado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }

    // Este listener se encarga de llamar a actualizarVista cuando el usuario cambia el select manualmente
    selectVistas.addEventListener('change', () => {
        // En este caso, la vista seleccionada ya proviene directamente del dropdown.
        actualizarVista(selectVistas.options[selectVistas.selectedIndex].text.toLowerCase());
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const usuarioInput = document.getElementById('usuario');
    const contrasenaInput = document.getElementById('contrasena');
    const botonIniciarSesion = document.getElementById('btnIniciarSesion');
    const formularioLogin = document.getElementById('formLogin');
    const mensajeError = document.getElementById('mensajeError');

    // Verifica si ambos campos están completos
    function verificarCampos() {
        const usuarioVal = usuarioInput.value.trim();
        const contrasenaVal = contrasenaInput.value.trim();
        botonIniciarSesion.disabled = !(usuarioVal && contrasenaVal);
    }

    // Escuchamos cambios en los campos
    usuarioInput.addEventListener('input', verificarCampos);
    contrasenaInput.addEventListener('input', verificarCampos);

    // Manejamos el envío del formulario
    formularioLogin.addEventListener('submit', (e) => {
        e.preventDefault(); // prevenimos que se recargue la página

        const usuarioIngresado = usuarioInput.value.trim();
        const contrasenaIngresada = contrasenaInput.value.trim();

        // Obtenemos usuarios registrados del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Buscamos si hay uno que coincida
        const usuarioEncontrado = usuarios.find(user =>
            user.nombreUsuario === usuarioIngresado &&
            user.contrasena === contrasenaIngresada
        );

        if (usuarioEncontrado) {
            // Guardamos sesión para mostrar luego en paginaInicio.html
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));

            // Redirigimos a la vista principal
            window.location.href = './src/html/paginaInicio.html';
        } else {
            mensajeError.textContent = 'Usuario o contraseña incorrectos';
        }
    });
});
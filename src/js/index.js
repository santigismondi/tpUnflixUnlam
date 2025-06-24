document.addEventListener('DOMContentLoaded', () => {
    const usuarioInput = document.getElementById('usuario');
    const contrasenaInput = document.getElementById('contrasena');
    const botonIniciarSesion = document.getElementById('btnIniciarSesion');
    const formularioLogin = document.getElementById('formLogin');
    const mensajeError = document.getElementById('mensajeError');


    function verificarCampos() {
        const usuarioVal = usuarioInput.value.trim();
        const contrasenaVal = contrasenaInput.value.trim();
        botonIniciarSesion.disabled = !(usuarioVal && contrasenaVal);
    }


    usuarioInput.addEventListener('input', verificarCampos);
    contrasenaInput.addEventListener('input', verificarCampos);


    formularioLogin.addEventListener('submit', (e) => {
        e.preventDefault(); // prevenimos que se recargue la pagina

        const usuarioIngresado = usuarioInput.value.trim();
        const contrasenaIngresada = contrasenaInput.value.trim();


        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


        const usuarioEncontrado = usuarios.find(user =>
            user.nombreUsuario === usuarioIngresado &&
            user.contrasena === contrasenaIngresada
        );

        if (usuarioEncontrado) {

            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));

            window.location.href = './src/html/paginaInicio.html';
        } else {
            mensajeError.textContent = 'Usuario o contraseña incorrectos';
        }
    });
});


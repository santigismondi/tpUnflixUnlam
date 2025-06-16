document.addEventListener('DOMContentLoaded', () => {
    const usuarioInput = document.getElementById('usuario');
    const emailInput = document.getElementById('email');
    const btnConfirmar = document.getElementById('btnConfirmar');
    const form = document.getElementById('formRecuperar');
    const mensajeError = document.getElementById('mensajeError');

    function verificarCampos() {
        const usuarioVal = usuarioInput.value.trim();
        const emailVal = emailInput.value.trim();
        btnConfirmar.disabled = !(usuarioVal && emailVal);
    }

    usuarioInput.addEventListener('input', verificarCampos);
    emailInput.addEventListener('input', verificarCampos);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = usuarioInput.value.trim();
        const email = emailInput.value.trim();

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(u =>
            u.nombreUsuario === usuario && u.email === email
        );

        if (usuarioEncontrado) {
            mensajeError.style.color = "green";
            mensajeError.textContent = "Se envió un correo para recuperar la contraseña";
        } else {
            mensajeError.style.color = "red";
            mensajeError.textContent = "Usuario o correo no coinciden con ningún registro.";
        }
    });
});
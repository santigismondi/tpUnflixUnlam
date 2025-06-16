document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formRegistro');
    const botonConfirmar = document.querySelector('.btn-confirmar');

    // Validadores Regulares
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const letrasYNumeros = /^[A-Za-z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contraseñaRegex = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_+={}\[\]:;"'<>,.?~\\/-]){2,}).{8,}$/;

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const nombreUsuarioInput = document.getElementById('nombreUsuario');
    const contrasenaInput = document.getElementById('contrasena');
    const repetirContrasenaInput = document.getElementById('repetir_contrasena');
    const numeroTarjetaInput = document.querySelector('input[name="numero_tarjeta"]');
    const codigoSeguridadInput = document.querySelector('input[name="codigo_seguridad"]');

    const mostrarError = (input, mensaje) => {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error')) {
            error = document.createElement('div');
            error.classList.add('error');
            error.style.color = 'red';
            error.style.fontSize = '0.9rem';
            input.insertAdjacentElement('afterend', error);
        }
        error.textContent = mensaje;
    };

    const limpiarError = (input) => {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error')) {
            error.remove();
        }
    };

    const validarFormulario = () => {
        let esValido = true;

        limpiarError(nombreInput);
        if (!soloLetras.test(nombreInput.value.trim())) {
            mostrarError(nombreInput, 'Solo se permiten letras');
            esValido = false;
        }

        limpiarError(apellidoInput);
        if (!soloLetras.test(apellidoInput.value.trim())) {
            mostrarError(apellidoInput, 'Solo se permiten letras');
            esValido = false;
        }

        limpiarError(emailInput);
        if (!emailRegex.test(emailInput.value.trim())) {
            mostrarError(emailInput, 'Email inválido');
            esValido = false;
        }

        limpiarError(nombreUsuarioInput);
        if (!letrasYNumeros.test(nombreUsuarioInput.value.trim())) {
            mostrarError(nombreUsuarioInput, 'Solo letras y números');
            esValido = false;
        }

        limpiarError(contrasenaInput);
        if (!contraseñaRegex.test(contrasenaInput.value.trim())) {
            mostrarError(contrasenaInput, 'Debe tener mínimo 8 caracteres, 2 letras, 2 números y 2 símbolos');
            esValido = false;
        }

        limpiarError(repetirContrasenaInput);
        if (repetirContrasenaInput.value.trim() !== contrasenaInput.value.trim()) {
            mostrarError(repetirContrasenaInput, 'Las contraseñas no coinciden');
            esValido = false;
        }

        // Validar tarjeta (solo si fue seleccionada)
        const tarjetaSeleccionada = document.querySelector('input[name="pago"][value="tarjeta"]').checked;
        if (tarjetaSeleccionada) {
            limpiarError(numeroTarjetaInput);
            const numero = numeroTarjetaInput.value.trim();
            if (!/^\d{16}$/.test(numero)) {
                mostrarError(numeroTarjetaInput, 'Debe tener 16 dígitos numéricos');
                esValido = false;
            } else {
                const digitos = numero.split('').map(Number);
                const suma = digitos.slice(0, -1).reduce((a, b) => a + b, 0);
                const ultimo = digitos[15];

                if ((suma % 2 === 0 && ultimo % 2 === 0) || (suma % 2 === 1 && ultimo % 2 === 1)) {
                    mostrarError(numeroTarjetaInput, 'El último dígito debe ser par si la suma es impar, e impar si la suma es par');
                    esValido = false;
                }
            }

            limpiarError(codigoSeguridadInput);
            const cod = codigoSeguridadInput.value.trim();
            if (!/^\d{3}$/.test(cod) || cod === "000") {
                mostrarError(codigoSeguridadInput, 'Código inválido');
                esValido = false;
            }
        }

        botonConfirmar.disabled = !esValido;
        return esValido;
    };

    formulario.addEventListener('input', validarFormulario);

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        const nuevoUsuario = {
            nombreUsuario: nombreUsuarioInput.value.trim(),
            contrasena: contrasenaInput.value.trim(),
            nombre: nombreInput.value.trim(),
            apellido: apellidoInput.value.trim(),
            email: emailInput.value.trim()
        };

        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        const yaExiste = usuariosGuardados.some(user => user.nombreUsuario === nuevoUsuario.nombreUsuario);
        if (yaExiste) {
            alert('Ese nombre de usuario ya está registrado');
            return;
        }

        const emailYaExiste = usuariosGuardados.some(user => user.email === nuevoUsuario.email);
        if (emailYaExiste) {
            alert('Ese email ya está registrado');
            return;
        }

        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        alert('Registro exitoso! Ahora podés iniciar sesión.');
        window.location.href = '../../index.html';
    });
});
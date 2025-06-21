const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));

const labelEmailUsuario = document.getElementById('idEmailUser');
labelEmailUsuario.innerHTML = usuarioLogueado.email;

const labelNombreUsuario = document.getElementById('idLabelNombreUsuario');
labelNombreUsuario.innerHTML = usuarioLogueado.nombreUsuario;

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');
    const contraseñaRegex = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_+={}\[\]:;"'<>,.?~\\/-]){2,}).{8,}$/;
    const idFormNewContra = document.getElementById('idFormNewContra');
    const idFormConfirmContra = document.getElementById('idFormConfirmContra');
    const radioButtonsPago = document.querySelectorAll('input[name="pago"]');
    //const btnGuardarCambios = document.getElementById('btnGuardarCambios');
    var error = false;

    if (usuarioLogueadoJSON) {
        const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
        const tipoPagoUsuario = usuarioLogueado.tipoPago;
        const radioButtonsPago = document.querySelectorAll('input[name="pago"]');

        radioButtonsPago.forEach(radio => {
            if (radio.value === tipoPagoUsuario) {
                radio.checked = true;
            }
        });
    }

    if (btnGuardarCambios) {
        btnGuardarCambios.addEventListener('click', (event) => {
            event.preventDefault();
            
            const nuevaContrasena = idFormNewContra.value.trim();
            const confirmarContrasena = idFormConfirmContra.value.trim();

            if (nuevaContrasena) {
                if (nuevaContrasena !== confirmarContrasena) {                    
                    var error = true;
                    return mensaje(error);
                }
                if (!contraseñaRegex.test(nuevaContrasena)) {                    
                    var error = true;
                    return mensaje(error);
                }                
                usuarioLogueado.contrasena = nuevaContrasena;
            }

            
            let nuevoTipoPago = null;
            radioButtonsPago.forEach(radio => {
                if (radio.checked) {
                    nuevoTipoPago = radio.value;
                    usuarioLogueado.tipoPago = nuevoTipoPago;
                }
            });

            if (nuevoTipoPago === 'tarjeta') {
                let numeroTarjeta = document.querySelector('input[name="pagoTarjeta"][placeholder="XXXX XXXX XXXX XXXX"]').value;
                let cvvTarjeta = document.querySelector('input[name="pagoTarjeta"][placeholder="CVV"]').value;
                usuarioLogueado.numeroTarjeta = numeroTarjeta;
                usuarioLogueado.codigoSeguridad = cvvTarjeta;
            }

            //SGI - Verificar si es necesario
            sessionStorage.removeItem('usuarioLogueado');
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));

            let usuariosEnLocalStorageJSON = localStorage.getItem('usuarios');
            let usuarios = [];
            if (usuariosEnLocalStorageJSON) {
                usuarios = JSON.parse(usuariosEnLocalStorageJSON);
            }

            const indexUsuario = usuarios.findIndex(user => user.email === usuarioLogueado.email);
            if (indexUsuario !== -1) {
                usuarios[indexUsuario] = usuarioLogueado;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));                
            }

            mensaje(error);
        });
    }    
    
    if (btnCancelarSuscripcion) {
        btnCancelarSuscripcion.addEventListener('click', () => {

            if (usuarioLogueadoJSON) {
                const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
                let usuariosRegistradosJSON = localStorage.getItem('usuarios');
                let usuariosRegistrados = [];

                if (usuariosRegistradosJSON) {
                    usuariosRegistrados = JSON.parse(usuariosRegistradosJSON);
                }
                const usuariosActualizados = usuariosRegistrados.filter(usuario => {
                    return usuario.email !== usuarioLogueado.email;
                });

                localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
            }

            sessionStorage.removeItem('usuarioLogueado');       
            window.location.href = '../../index.html'; 
        });
    }
});

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

function mensaje(error){
    const nodoMensajeError = document.getElementById('error');
    if (!error) {
        nodoMensajeError.innerHTML= 'Cambios guardados exitosamente.';
        nodoMensajeError.style.color = '#009446';
    } else {
        nodoMensajeError.innerHTML= 'Hubo un error al guardar los cambios. Por favor, revisa los campos ingresados.';
        nodoMensajeError.style.color = '#940000';
    }
}
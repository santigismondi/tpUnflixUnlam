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

    if (usuarioLogueadoJSON) {
        const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
        const tipoPagoUsuario = usuarioLogueado.tipoPago;
        const radioButtonsPago = document.querySelectorAll('input[name="pago"]');

        radioButtonsPago.forEach(radio => {
            if (radio.value === tipoPagoUsuario) {
                radio.checked = true;
            }
        });
        if(tipoPagoUsuario === 'cupon') {
            const tipoCupon = usuarioLogueado.tipoCupon;
            const checkCuponPago = document.querySelector(`input[name="pagoCupon"][value="${tipoCupon}"]`);
            if (checkCuponPago) {
                checkCuponPago.checked = true;
            }
        }
    }
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogueado');       
            window.location.href = '../../index.html'; 
        });
    }
    if (btnGuardarCambios) {
        btnGuardarCambios.addEventListener('click', (event) => {
            event.preventDefault();
            let error = false;
            const nuevaContrasena = idFormNewContra.value.trim();
            const confirmarContrasena = idFormConfirmContra.value.trim();

            if (nuevaContrasena) {
                if (nuevaContrasena !== confirmarContrasena) {                    
                    error = true;
                    return mensaje(error);
                }
                if (!contraseñaRegex.test(nuevaContrasena)) {                    
                    error = true;
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

                if(!numeroTarjeta || !cvvTarjeta) {
                    mostrarError(document.querySelector('input[name="pago"][value="tarjeta"]'), 'Debe completar los campos de tarjeta');
                    error = true;
                }
                const numero = numeroTarjeta.value.trim();
                if (!/^\d{16}$/.test(numero)) {
                    mostrarError(numero, 'Debe tener 16 dígitos numéricos');
                    error = true;
                } else {
                    const digitos = numero.split('').map(Number);
                    const suma = digitos.slice(0, -1).reduce((a, b) => a + b, 0);
                    const ultimo = digitos[15];

                    function esPar(n) {
                        if (n === 0 || n === 2 || n === 4 || n === 6 || n === 8) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                
                    const sumaUltimoDigito = Number(String(suma).slice(-1));
                    const sumaEsPar = esPar(sumaUltimoDigito);
                    const ultimoEsPar = esPar(ultimo);
                    
                    if ((sumaEsPar && ultimoEsPar) || (!sumaEsPar && !ultimoEsPar)) {
                        mostrarError(numero, 'El último dígito debe ser par si la suma es impar, e impar si la suma es par');
                        error = true;
                    }                
                }

                const cod = cvvTarjeta.value.trim();
                if (!/^\d{3}$/.test(cod) || cod === "000") {
                    mostrarError(cod, 'Código inválido');
                    error = true;
                }
                if (!error) {
                    usuarioLogueado.numeroTarjeta = numeroTarjeta;
                    usuarioLogueado.codigoSeguridad = cvvTarjeta;
                }
            }

            if (nuevoTipoPago === 'cupon') {
                if(document.querySelector('input[name="pago_facil"]').checked && document.querySelector('input[name="rapipago"]').checked){
                    mostrarError(document.querySelector('input[name="pago"][value="cupon"]'), 'Debe seleccionar un solo tipo de cupón');
                    error = false;
                }
                if(document.querySelector('input[name="pago_facil"]').checked){
                    const nuevoTipoCupon = "pago_facil";
                    usuarioLogueado.tipoCupon = nuevoTipoCupon;
                }else if(document.querySelector('input[name="rapipago"]').checked){
                    const nuevoTipoCupon = "rapipago";
                    usuarioLogueado.tipoCupon = nuevoTipoCupon;
                }else{
                    mostrarError(document.querySelector('input[name="pago"][value="cupon"]'), 'Debe seleccionar un tipo de cupón');
                    error = true;
                }
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